import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { parse, getTime, format, eachDay, isLastDayOfMonth, differenceInCalendarDays } from 'date-fns';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Header/Navbar.jsx';
import StageBar from './components/stageBar/StageBar.jsx';
import DrawerAndApplicationTable from './components/DrawerAndApplicationTable.jsx';
import Connect from './components/Connect/Connect.jsx';

import PersonalAnalytics from './components/Analytics/PersonalAnalytics.jsx';
import FirstDateAppliedForJob from './components/Analytics/FirstDateAppliedForJob.jsx';

const seanStyleBox = require('./../styles/seanStyleBox.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      applications: [],
      stageNameToColorHash: {},
      stageNameToAppsHash: {},
      appliedDateToCountHash: {},
      stagesCount: {},
      navBarIsHidden: false,
      profile: {},
      stages_settings: [
        { name: 'Considering', backgroundColor: '#dad8d3', textColor: 'black' },
        { name: 'Applied', backgroundColor: '#ffd042', textColor: 'black' },
        { name: 'Phone Screen', backgroundColor: '#eb9444', textColor: 'white' },
        { name: 'Tech Screen', backgroundColor: '#50abd8', textColor: 'white' },
        { name: 'On Site', backgroundColor: '#9256a0', textColor: 'white' },
        { name: 'Offer', backgroundColor: '#0da17d', textColor: 'white' },
        { name: 'Denied', backgroundColor: '#eb3d34', textColor: 'white' }
      ],
      stages_filter: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
      },
      isAlphabetOrder: true,
      isStageOrder: true,
      isDateDescendingOrder: true,
      dateAppliedCountDataForGraph: [],
    };
    this.getApplicationsFromDB = this.getApplicationsFromDB.bind(this);
    this.stageNameToColorHash = this.stageNameToColorHash.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.countApplicationStages = this.countApplicationStages.bind(this);
    this.updateOneAppStage = this.updateOneAppStage.bind(this);
    this.updateOneKeyValPairInFE = this.updateOneKeyValPairInFE.bind(this);
    this.createNewApplicationInFE = this.createNewApplicationInFE.bind(this);
    this.sortAppsByAlphaOrder = this.sortAppsByAlphaOrder.bind(this);
    this.sortAppsByStageOrder = this.sortAppsByStageOrder.bind(this);
    this.sortAppsByDate = this.sortAppsByDate.bind(this);
    this.sortAppsByIsFavorite = this.sortAppsByIsFavorite.bind(this);
    this.setStageNameToAppsHash = this.setStageNameToAppsHash.bind(this);
    this.toggleIsFavoriteForOneAppInFE = this.toggleIsFavoriteForOneAppInFE.bind(this);
    this.generateAppliedCountGraphData = this.generateAppliedCountGraphData.bind(this);
    this.updateOneKeyValPairToDB = this.updateOneKeyValPairToDB.bind(this);
  }

  componentDidMount() {
    this.getApplicationsFromDB();
  }


  /**
   * Function passed down and ran anytime a change to stages settings occurs,
   * If second parameter(applications) is passed, update state of applications.
   * @param  {array} stages Array of Stages containing settings for each different stage.
   * @param  {array} applications Array of applications.
   */
  onStagesChange(stages, applications) {
    this.setState({
      'stages_settings': stages
    }, () => {
      //       console.log(this.state.stages_settings)
      this.updateStages();
      this.stageNameToColorHash(stages);
      this.countApplicationStages();
    });
    if (applications !== undefined) {
      this.setState({ applications }, this.countApplicationStages);
    }
  }


  /**
   * Retrieve users settings and applications from DB
   * Counts applications stages.
   * @async
   */
  getApplicationsFromDB(callback) {
    axios.get('/api/profiles')
      .then((userData) => {
        let allData = userData.data;
        let userId = userData.data.id;
        let profile = userData.data;
        this.stageNameToColorHash(this.state.stages_settings);

        this.setState({ profile, userId });

        axios.get('/api/applications')
          .then((applicationData) => {
            // sort applications by date
            let applications = applicationData.data;
            applications.sort((a, b) => {
              return getTime(parse(b.applied_at)) - getTime(parse(a.applied_at));
            });

            let appliedDateToCountHash = {};
            applications.forEach((application) => {
              let formattedDate = format(application.applied_at, 'ddd, MM/DD/YY');
              if (appliedDateToCountHash[formattedDate] === undefined) {
                appliedDateToCountHash[formattedDate] = 1;
              } else {
                appliedDateToCountHash[formattedDate] += 1;
              }
            });

            let applicationLen = applications.length;
            let oldestApplication = applications[applicationLen - 1];
            let oldestAppAppliedAt = oldestApplication.applied_at;
            let dataForGraph = this.generateAppliedCountGraphData(oldestAppAppliedAt, new Date());

            dataForGraph.forEach((dateInOneMonth) => {
              dateInOneMonth.forEach((oneDate) => {
                oneDate.howManyApplied = appliedDateToCountHash[oneDate.appliedDate];
              });
            });

            this.setState({
              applications,
              appliedDateToCountHash,
              dateAppliedCountDataForGraph: dataForGraph
            }, () => {
              this.countApplicationStages();
              this.setStageNameToAppsHash();
            });
            if (typeof callback === 'function') {
              callback();
            }
          })
          .catch((err) => {
            console.log('err from api/applications');
          });
      })
      .catch((err) => {
        console.log('err from /api/preference', err);
      });
  }

  setStageNameToAppsHash() {
    let applications = this.state.applications;
    let tempHash = {};
    this.state.stages_settings.forEach((item) => {
      tempHash[item.name] = [];
    });

    applications.forEach((application) => {
      let stage = application.stage;
      tempHash[stage].push(application);
    });
    this.setState({ stageNameToAppsHash: tempHash });
  }

  /**
   * Sets the state that each color on the table will get based on the stage name.
   * @param  {array} stages_settings All the stages the current user has.
   */
  stageNameToColorHash(stages_settings) {
    let stageNameToColorHash = {};
    stages_settings.forEach((setting) => {
      stageNameToColorHash[setting.name] = {
        backgroundColor: setting.backgroundColor,
        color: setting.textColor,
      };
    });
    this.setState({ stageNameToColorHash });
  }

  sortAppsByAlphaOrder(columnName, isAlphabetOrder) {
    let sortedApplications = this.state.applications.slice();

    sortedApplications.sort((a, b) => {
      let B = a[columnName].toUpperCase();
      let A = b[columnName].toUpperCase();
      if (isAlphabetOrder) {
        A = a[columnName].toUpperCase();
        B = b[columnName].toUpperCase();
      }

      if (A === B) { return 0; }
      return A < B ? -1 : 1;
    });

    this.setState({
      applications: sortedApplications,
      isAlphabetOrder: !isAlphabetOrder
    });
  }

  sortAppsByStageOrder(isStageOrder) {
    let sortedApplications = [];
    let tempArr = Object.values(this.state.stageNameToAppsHash);

    tempArr.forEach((arr) => {
      sortedApplications = sortedApplications.concat(arr);
    });

    if (!isStageOrder) {
      sortedApplications = sortedApplications.reverse();
    }
    this.setState({
      applications: sortedApplications,
      isStageOrder: !isStageOrder,
    });
  }

  sortAppsByDate(isDateDescendingOrder) {
    let sortedApplications = this.state.applications;
    sortedApplications.sort((a, b) => {
      return getTime(parse((b.applied_at))) - getTime(parse((a.applied_at)));
    });

    if (!isDateDescendingOrder) {
      sortedApplications = sortedApplications.reverse();
    }

    this.setState({
      applications: sortedApplications,
      isDateDescendingOrder: !isDateDescendingOrder,
    });
  }

  sortAppsByIsFavorite() {
    //     console.log('sortAppsByFav');
    let sortedApplications = this.state.applications.slice();

    sortedApplications.sort((a, b) => {
      let B = a.isFavorite.toString();
      let A = b.isFavorite.toString();
      if (A === B) { return 0; }
      return A < B ? -1 : 1;
    });

    this.setState({
      applications: sortedApplications,
    });
  }

  /**
   * Counts how many applications each stage has for
   * dynamic rendering of stage length.
   * @todo: Set both count and size of flex-grow
   */
  countApplicationStages() {
    let applications = this.state.applications;
    let count = {};
    // console.log('Counting: ', applications);
    // Count number of each stage.
    for (let i = 0; i < applications.length; i++) {
      let stage = applications[i].stage;
      if (count[stage] === undefined) {
        count[stage] = 1;
      } else {
        count[stage]++;
      }
    }
    // Set count state after counting.
    this.setState({
      stagesCount: count
    });
  }

  /**
   * filters stages based on true and false in an array.
   */
  filterStages() {
    const stageNameToIndex = {
      'Considering': 0,
      'Applied': 1,
      'Phone Screen': 2,
      'Tech Screen': 3,
      'On Site': 4,
      'Offer': 5,
      'Denied': 6,
    };

    let filteredApplications = [];
    for (let i = 0; i < this.state.applications.length; i++) {
      let application = this.state.applications[i],
        stage = application['stage'],
        appStage = stageNameToIndex[stage];
      if (this.state.filter_stages[appStage]) {
        filteredApplications.push(application)
      }
    }
    this.setState({
      applications: filteredApplications
    })
  }

  /**
   * Toggles a stage on/off to display in the field.
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  toggleStage(index) {
    let currentSettings = this.state.stages_filter;
    currentSettings[index] = !currentSettings[index];
    this.setState({
      stages_filter: currentSettings
    }, this.filterStages);
  }

  /**
   * Function to toggle nav bar on scroll. Scroll up displays navbar. Scroll down hides navbar. Does this by changing state of navBarIsHidden.
   * @param  {number} scrollDirection From react onWheel event. event.deltaY. positive is a scroll up. negative is a scroll down.
   */
  toggleNavBar(scrollDirection) {
    if (this.state.navBarIsHidden && scrollDirection < -5) {
      this.setState({
        navBarIsHidden: !this.state.navBarIsHidden
      });
    } else if (!this.state.navBarIsHidden && scrollDirection > 5) {
      this.setState({
        navBarIsHidden: !this.state.navBarIsHidden
      });
    }
  }

  /**
   * Updates the state when a applications stage changes and recounts applications.
   * @param  {integer} idx  Index of the application needed to be updated
   * @param  {string} updatedState The string the applications stage is set to.
   */
  updateOneAppStage(idx, updatedState) {
    this.state.applications[idx].stage = updatedState;
    this.setState({
      applications: this.state.applications
    }, this.countApplicationStages);
  }

  updateOneKeyValPairInFE(idx, updatedField, updatedText) {
    // console.log(idx, updatedField,updatedText);
    //     console.log(this.state.applications)
    if (updatedField === 'contacts' || updatedField === 'notes') {
      //       console.log('here', this.state.applications[idx][updatedField]);
      this.state.applications[idx][updatedField].push(updatedText)
      this.setState({
        applications: this.state.applications
      });
    } else if (this.state.applications[idx][updatedField]
      || this.state.applications[idx][updatedField] === ''
      || this.state.applications[idx][updatedField] === null) {
      this.state.applications[idx][updatedField] = updatedText;
      this.setState({
        applications: this.state.applications
      });
    } else {
      console.log('update one app in front end did not work bc field does not exist');
    }
  }

  createNewApplicationInFE(newApplication) {
    let updatedApplications = [newApplication].concat(this.state.applications);
    this.setState({ applications: updatedApplications });
  }

  toggleIsFavoriteForOneAppInFE(applications, idx) {
    console.log('before:', applications[idx].isFavorite);
    applications[idx].isFavorite = !applications[idx].isFavorite;
    this.setState({ applications });
    console.log('after:', applications[idx].isFavorite);
    this.updateOneKeyValPairToDB(applications[idx], 'isFavorite');
  }

  updateOneKeyValPairToDB(application, appKey) {
    let route = `/api/applications/${application.id}`;
    let key = appKey;
    let val = application[appKey];
    let body = {};
    //     console.log('keyVal', key, val);
    body[key] = val;
    //     console.log('body', body);
    axios.post(route, body)
      .then((app) => {
        console.log(app);
      })
      .catch((message) => { console.log(message); });
  }

  generateAppliedCountGraphData(begDate, endDate) {
    // let beginningDate = '08/15/17';
    // let todayDate = new Date();
    let tempArr = [];
    let parseBegDate = parse(begDate);
    let parseEndDate = parse(endDate);

    let allDates = eachDay(parseBegDate, parseEndDate);

    let datesInOneMonth = [];
    allDates.forEach((date) => {
      datesInOneMonth.push(date);
      if (isLastDayOfMonth(date)) {
        tempArr.push(datesInOneMonth);
        datesInOneMonth = [];
      }
    });
    tempArr.push(datesInOneMonth);

    let outputArr = tempArr.map((dates) => {
      let dataForGraph = dates.map((date) => {
        let formattedDate = format(date, 'ddd, MM/DD/YY');
        return {
          appliedDate: formattedDate,
          howManyApplied: 0,
        };
      });
      return dataForGraph;
    });
    return outputArr;
  }

  render() {
    return (
      <Router>
        <div
          // onWheel={(event) => { this.toggleNavBar(event.deltaY); }}
        >
          <Navbar
            navBarIsHidden={this.state.navBarIsHidden}
            profileImg={this.state.profile.image_link || "./assets/default_avatar.png"}
            profile={this.state.profile}
            displayName={this.state.profile.display || 'profile'}
          />
          <Switch>
            <Route
              key={1}
              exact path={'/'}
              render={() => {
                return (
                  <div>
                    <div className={seanStyleBox.box_94per_3perMg}>
                      <div className={seanStyleBox.PatrickStatusBar}>
                        <StageBar
                          stages={this.state.stages_settings}
                          stagesCount={this.state.stagesCount}
                          stageNameToColorHash={this.state.stageNameToColorHash}
                          applications={this.state.applications}
                          stages_filter={this.state.stages_filter}
                          toggleStage={this.toggleStage}
                        />
                      </div>
                    </div>


                    <div className={seanStyleBox.DrawerAndApplicationTable}>
                      <DrawerAndApplicationTable
                        applications={this.state.applications}
                        stages_settings={this.state.stages_settings}
                        stageNameToColorHash={this.state.stageNameToColorHash}
                        getApplicationsFromDB={this.getApplicationsFromDB}
                        updateOneAppStage={this.updateOneAppStage}
                        updateOneKeyValPairInFE={this.updateOneKeyValPairInFE}
                        createNewApplicationInFE={this.createNewApplicationInFE}
                        sortAppsByAlphaOrder={this.sortAppsByAlphaOrder}
                        isAlphabetOrder={this.state.isAlphabetOrder}
                        isStageOrder={this.state.isStageOrder}
                        isDateDescendingOrder={this.state.isDateDescendingOrder}
                        sortAppsByStageOrder={this.sortAppsByStageOrder}
                        sortAppsByDate={this.sortAppsByDate}
                        sortAppsByIsFavorite={this.sortAppsByIsFavorite}
                        toggleIsFavoriteForOneAppInFE={this.toggleIsFavoriteForOneAppInFE}
                      />
                    </div>
                  </div>
                )
              }}
            />
            <Route
              key={2}
              path={'/analytics'}
              render={() => {
                let applicationCount = this.state.applications.length;
                if (applicationCount > 0) {
                  let firstMonth = this.state.dateAppliedCountDataForGraph[0];
                  let lastMonth = this.state.dateAppliedCountDataForGraph[this.state.dateAppliedCountDataForGraph.length - 1];
                  let firstDay = firstMonth[0].appliedDate;
                  let lastDay = lastMonth[lastMonth.length - 1].appliedDate;
                  let diffBtwLastAndFirstDate = differenceInCalendarDays(parse(lastDay), parse(firstDay)) + 1;
                  return (
                    <div>
                      <div style={{ height: 100 }} />
                      <FirstDateAppliedForJob
                        dateOfFirstApplied={firstDay}
                        todaysDate={lastDay}
                        applicationCount={applicationCount}
                        diffBtwLastAndFirstDate={diffBtwLastAndFirstDate}
                      />
                      {this.state.dateAppliedCountDataForGraph.map((data, idx) => {
                        let intMonth = data[0].appliedDate.slice(5, 7);
                        return (
                          <PersonalAnalytics
                            key={idx}
                            intMonth={intMonth}
                            dateAppliedGraphData={data}
                          />);
                      })}
                    </div>
                  );
                }
                return (<div>a</div>);
              }}
            />
            <Route
              key={3}
              path={'/connect'}
              render={() => {
                return (
                  <div>
                    <Connect />
                  </div>
                )
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

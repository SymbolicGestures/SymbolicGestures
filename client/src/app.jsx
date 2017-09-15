import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { parse, getTime, format } from 'date-fns';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Navbar from './components/Header/Navbar.jsx';
import StageBar from './components/stageBar/StageBar.jsx';
import DrawerAndApplicationTable from './components/DrawerAndApplicationTable.jsx';
import Analytics from './components/analytics/Analytics.jsx';
const fakeApplicationsGenerator = require('./../../config/fakeApplicationsGenerator.js');

let fakeApplications = fakeApplicationsGenerator(15);
let fakestages_settings = [
  { name: 'Considering', backgroundColor: '#FF9800', textColor: 'black' },
  { name: 'Applied', backgroundColor: '#FFC107', textColor: 'black' },
  { name: 'Phone Screen', backgroundColor: '#2196F3', textColor: 'white' },
  { name: 'OFFER', backgroundColor: '#009688', textColor: 'white' },
  { name: 'Denied', backgroundColor: '#F44336', textColor: 'white' },
  { name: 'On Site', backgroundColor: '#F44336', textColor: 'white' }
];

let fakeStageNameToColorHash = {};
fakestages_settings.forEach((setting) => {
  fakeStageNameToColorHash[setting.name] = {
    backgroundColor: setting.backgroundColor,
    color: setting.textColor,
  };
});

const seanStyleBox = require('./../styles/seanStyleBox.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // for data from database
      userId: undefined,
      applications: [],
      stageNameToColorHash: {},
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
    };
    // this.state = { // for data from fake data
    //   applications: fakeApplications,
    //   stages_settings: fakestages_settings,
    //   fakeStageNameToColorHash,
    // };
    this.getApplicationsFromDB = this.getApplicationsFromDB.bind(this);
    this.stageNameToColorHash = this.stageNameToColorHash.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.countApplicationStages = this.countApplicationStages.bind(this);
    this.onStagesChange = this.onStagesChange.bind(this);
    this.updateStages = this.updateStages.bind(this);
    this.updateOneAppStage = this.updateOneAppStage.bind(this);
    this.updateOneKeyValPairInFE = this.updateOneKeyValPairInFE.bind(this);
    this.createNewApplicationInFE = this.createNewApplicationInFE.bind(this);
  }

  componentDidMount() {
    this.getApplicationsFromDB();
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

        this.setState({profile, userId});


        // console.log('stageNameToColorHash:', stageNameToColorHash);
        // console.log('fakeStageNameToColorHash:', fakeStageNameToColorHash);

        axios.get('/api/applications')
          .then((applicationData) => {
            // console.log('Applications from database:', applicationData.data);

            let strDateToMiliSec = (strDate) => {
              return getTime(parse(strDate));
            };

            let applications = applicationData.data;
            applications.sort((a, b) => {
              return strDateToMiliSec(b.created_at) - strDateToMiliSec(a.created_at);
            });

            applications = applications.map((application) => {
              application.created_at = format(parse(application.created_at), 'ddd, MMM DD, YY');
              return application;
            });

            this.setState({ applications }, this.countApplicationStages);
            if (typeof callback === 'function') {
              callback();
            }
          })
          .catch((err) => {
            console.log('err from api/applications');
            // console.log(err);
          });
      })
      .catch((err) => {
        console.log('err from /api/preference', err);
        // console.log(err);
      });
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
   * Function passed down and ran anytime a change to stages settings occurs,
   * If second parameter(applications) is passed, update state of applications.
   * @param  {array} stages Array of Stages containing settings for each different stage.
   * @param  {array} applications Array of applications.
   */
  onStagesChange(stages, applications) {
    // console.log('previous stages', this.state.stages_settings)
    this.setState({
      'stages_settings': stages
    }, () => {
      console.log(this.state.stages_settings)
      this.updateStages();
      this.stageNameToColorHash(stages);
      this.countApplicationStages();
    });
    // console.log(!!applications);
    if (applications !== undefined) {
      // console.log(this.state.applications);
      this.setState({'applications': applications}, this.countApplicationStages);
    }
  }

  /**
   * Updates to database the stages for current user.
   * @async post to database
   */
  updateStages() {
    axios.post('/api/profiles', {'stages_settings': this.state.stages_settings})
      .then(function (response) {
        console.log('post req stage succeed');
        console.log(response);
      })
      .catch(function (error) {
        console.log('post req empty application failed');
        console.log(error);
      });
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
    // console.log('app', this.state.applications[idx]);
    // console.log('upFi', updatedField);
    if (this.state.applications[idx][updatedField]
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

  render() {
    return (
      <Router>
        <div onWheel={(event) => { this.toggleNavBar(event.deltaY); }}>
          <Navbar
            navBarIsHidden={this.state.navBarIsHidden}
            profileImg={this.state.profile.image_link || "./assets/default_avatar.png"}
            displayName={this.state.profile.display || 'profile'}
            />
          {/* <div className="box_94per_3perMg"> */}
          <Switch>
            <Route
              key = {1}
              exact path = {'/'}
              render = {()=>{return (
                <div>
                  <div className={seanStyleBox.box_94per_3perMg}>
                    <div className={seanStyleBox.PatrickStatusBar}>
                      <StageBar
                        stages={this.state.stages_settings}
                        stagesCount={this.state.stagesCount}
                        stageNameToColorHash={this.state.stageNameToColorHash}
                        applications={this.state.applications}
                        updateOneAppStage={this.updateOneAppStage}
                        onStagesChange={this.onStagesChange}
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
                    />
                  </div>
                </div>
              )}}
            />
            <Route
              key = {2}
              path = {'/analytics'}
              component = {Analytics}
            />
            <Route
              key = {3}
              path = {'/connect'}
              render = { () => {return (
                <div>
                  <div className={seanStyleBox.box_94per_3perMg}></div>
                  <div> Connect! </div>
                  <img src='https://files.slack.com/files-pri/T60JJS25A-F70E8US1H/2017-09-08_06.00.10_pm.png' />
                </div>
              )}}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

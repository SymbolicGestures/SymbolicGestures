import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { parse, getTime, format } from 'date-fns';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Navbar from './components/Header/Navbar.jsx';
import StageBar from './components/stageBar/StageBar.jsx';
import DrawerAndApplicationTable from './components/DrawerAndApplicationTable.jsx';

const fakeApplicationsGenerator = require('./../../config/fakeApplicationsGenerator.js');

let fakeApplications = fakeApplicationsGenerator(15);
let fakestages_settings = [
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
      stages_settings: [],
      stageNameToColorHash: {},
      stagesCount: {},
      navBarIsHidden: false
    };
    // this.state = { // for data from fake data
    //   applications: fakeApplications,
    //   stages_settings: fakestages_settings,
    //   fakeStageNameToColorHash,
    // };
    this.getApplicationsFromDB = this.getApplicationsFromDB.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.countApplicationStages = this.countApplicationStages.bind(this);
    this.onStagesChange = this.onStagesChange.bind(this);
    this.updateStages = this.updateStages.bind(this);
    this.updateaOneAppStage = this.updateaOneAppStage.bind(this);
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
        let stages_settings = userData.data.stages_settings;
        let userId = userData.data.id;

        let stageNameToColorHash = {};
        stages_settings.forEach((setting) => {
          stageNameToColorHash[setting.name] = {
            backgroundColor: setting.backgroundColor,
            color: setting.textColor,
          };
          this.setState({stages_settings: stages_settings});
        });

        // console.log('stageNameToColorHash:', stageNameToColorHash);
        // console.log('fakeStageNameToColorHash:', fakeStageNameToColorHash);

        this.setState({ userId, stageNameToColorHash });

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
   * Counts how many applications each stage has for
   * dynamic rendering of stage length.
   * @todo: Set both count and size of flex-grow
   */
  countApplicationStages() {
    let applications = this.state.applications;
    let count = {};
    console.log('Counting: ', applications);
    // Count number of each stage.
    for (let i = 0; i < applications.length; i++) {
      let stage = applications[i].stage;
      if (count[stage] && count[stage] < 6) {
        count[stage]++;
      } else {
        count[stage] = 1;
      }
    }
    // Set count state after counting.
    this.setState({
      stagesCount: count
    });
  }

  /**
   * Function passed down and ran anytime a change to stages_settings occurs
   * @param  {array} stages Array of Stages containing settings for each.
   * @todo Create send to database function, then send after state is set.
   */
  onStagesChange(stages) {
    this.setState({
      stages_settings: stages
    }, this.updateStages)
  }

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
    if (this.state.navBarIsHidden && scrollDirection < 0) {
      this.setState({
        navBarIsHidden: !this.state.navBarIsHidden
      });
    } else if (!this.state.navBarIsHidden && scrollDirection > 0) {
      this.setState({
        navBarIsHidden: !this.state.navBarIsHidden
      });
    }
  }

  updateaOneAppStage(idx, updatedState) {
    this.state.applications[idx].stage = updatedState;
    this.setState({
      applications: this.state.applications
    });
  }

  render() {
    return (
      <Router>
        <div onWheel={(event) => { this.toggleNavBar(event.deltaY); }}>
          <Navbar navBarIsHidden={this.state.navBarIsHidden} />
          {/* <div className="box_94per_3perMg"> */}
          <Route
            key = {1}
            path = {'/'}
            exact = {true}
            component = {()=>{return (
              <div>
                <div className={seanStyleBox.box_94per_3perMg}>
                  <div className={seanStyleBox.PatrickStatusBar}>
                    <StageBar
                      stages={this.state.stages_settings}
                      stagesCount={this.state.stagesCount}
                      applications={this.state.applications}
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
                    updateaOneAppStage={this.updateaOneAppStage}
                  />
                </div>
              </div>
            )}}
          />
          <Route
            key = {2}
            path = {'/analytics'}
            component = { () => {return (
              <div>
                <div className={seanStyleBox.box_94per_3perMg}></div>
                <div> Analytics! </div>
                <img src='https://files.slack.com/files-pri/T60JJS25A-F71K231M5/pasted_image_at_2017_09_08_05_47_pm.png' />
              </div>
            )}}
          />
          <Route
            key = {3}
            path = {'/connect'}
            component = { () => {return (
              <div>
                <div className={seanStyleBox.box_94per_3perMg}></div>
                <div> Connect! </div>
                <img src='https://files.slack.com/files-pri/T60JJS25A-F70E8US1H/2017-09-08_06.00.10_pm.png' />
              </div>
            )}}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

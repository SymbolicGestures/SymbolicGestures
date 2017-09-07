import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { parse, getTime, format } from 'date-fns';

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
  }

  componentDidMount() {
    this.getApplicationsFromDB();
  }

  /**
   * Retrieve users settings and applications from DB
   * Counts applications stages.
   * @async
   */
  getApplications() {
    axios.get('/api/profiles')
      .then((userData) => {
        let stages_settings = userData.data.stages_settings;
        let userId = userData.data.id;
        console.log('stages_settings from database:', stages_settings);

        let stageNameToColorHash = {};
        stages_settings.forEach((setting) => {
          stageNameToColorHash[setting.name] = {
            backgroundColor: setting.backgroundColor,
            color: setting.textColor,
          };
          this.setState({ stages_settings });
        });

        // console.log('stageNameToColorHash:', stageNameToColorHash);
        // console.log('fakeStageNameToColorHash:', fakeStageNameToColorHash);

        this.setState({ userId, stageNameToColorHash });

        axios.get('/api/applications')
          .then((applicationData) => {
            console.log('Applications from database:', applicationData.data);

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

            this.setState({ applications });
          })
          .catch((err) => {
            // console.log('err from api/applications');
            // console.log(err);
          });
      })
      .catch((err) => {
        // console.log('err from /api/preference');
        // console.log(err);
      });
  }

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

  render() {
    return (
      <div onWheel={(event) => { this.toggleNavBar(event.deltaY); }}>
        <Navbar navBarIsHidden={this.state.navBarIsHidden} />
        {/* <div className="box_94per_3perMg"> */}
        <div className={seanStyleBox.box_94per_3perMg}>
          <div className={seanStyleBox.PatrickStatusBar}>
            <StageBar
              stages={this.state.stages_settings}
              stagesCount={this.state.stagesCount}
              applications={this.state.applications}
            />
          </div>
        </div>


        <div className={seanStyleBox.DrawerAndApplicationTable}>
          <DrawerAndApplicationTable
            applications={this.state.applications}
            stages_settings={this.state.applications}
            stageNameToColorHash={this.state.stageNameToColorHash}
            getApplicationsFromDB={this.getApplicationsFromDB}
          />
        </div>


      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

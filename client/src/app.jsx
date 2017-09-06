import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { format } from 'date-fns';

import Navbar from './components/Header/Navbar.jsx';

import DrawerAndApplicationTable from './components/DrawerAndApplicationTable.jsx';

const fakeApplicationsGenerator = require('./../../config/fakeApplicationsGenerator.js');

let fakeApplications = fakeApplicationsGenerator(15);
let fakeStagesSettings = [
  { name: 'Applied', backgroundColor: '#FFC107', textColor: 'black' },
  { name: 'Phone Screen', backgroundColor: '#2196F3', textColor: 'white' },
  { name: 'OFFER', backgroundColor: '#009688', textColor: 'white' },
  { name: 'Denied', backgroundColor: '#F44336', textColor: 'white' },
  { name: 'On Site', backgroundColor: '#F44336', textColor: 'white' }
];

let fakeStageNameToColorHash = {};
fakeStagesSettings.forEach((setting) => {
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
      stagesSettings: [],
      stageNameToColorHash: {},
    };
    // this.state = { // for data from fake data
    //   applications: fakeApplications,
    //   stagesSettings: fakeStagesSettings,
    //   fakeStageNameToColorHash,
    // };
    this.getApplications = this.getApplications.bind(this);
  }

  componentDidMount() {
    this.getApplications();
  }

  getApplications() {
    axios.get('/api/preference')
      .then((userData) => {
        let stagesSettings = userData.data.stages_settings;
        let userId = userData.data.id;
        console.log('stagesSettings from database:', stagesSettings);

        let stageNameToColorHash = {};
        stagesSettings.forEach((setting) => {
          stageNameToColorHash[setting.name] = {
            backgroundColor: setting.backgroundColor,
            color: setting.textColor,
          };
        });

        console.log('stageNameToColorHash:', stageNameToColorHash);
        console.log('fakeStageNameToColorHash:', fakeStageNameToColorHash);

        this.setState({ userId, stageNameToColorHash });

        axios.get('/api/applications')
          .then((applicationData) => {
            console.log('Applications from database:', applicationData.data);
            this.setState({ applications: applicationData.data });
          })
          .catch((err) => {
            console.log('err from api/applications');
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('err from /api/preference');
        console.log(err);
      });
  }

  closeDrawer(e) {
    // console.log('className:', e.target.className);
    // console.log('attribute:', e.target.attributes);
    // console.log('nodeName:', e.target.nodeName);
    // console.log('nodeValue:', e.target.nodeValue);
  }

  render() {
    return (
      <div onClick={this.closeDrawer} >
        <Navbar />
        <div className={seanStyleBox.box_94per_3perMg} />

        {/* <div className="box_94per_3perMg"> */}
        <div className={seanStyleBox.box_94per_3perMg}>
          <div className={seanStyleBox.PatrickStatusBar}>
            <h3>Patrick Status Bar</h3>
          </div>
        </div>

        <div className={seanStyleBox.box_94per_3perMg}>
        </div>

        <div className={seanStyleBox.DrawerAndApplicationTable}>
          <DrawerAndApplicationTable
            applications={this.state.applications}
            stagesSettings={this.state.applications}
            stageNameToColorHash={this.state.stageNameToColorHash}
          />
        </div>


      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

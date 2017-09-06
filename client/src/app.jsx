import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


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

let stageNameToColorHash = {};
fakeStagesSettings.forEach((setting) => {
  stageNameToColorHash[setting.name] = {
    backgroundColor: setting.backgroundColor,
    color: setting.textColor,
  };
});

const seanStyleBox = require('./../styles/seanStyleBox.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: fakeApplications,
      stagesSettings: fakeStagesSettings,
      stageNameToColorHash,
    };
    this.getApplications = this.getApplications.bind(this);
  }

  componentDidMount() {
    this.getApplications();
  }

  getUsersInfo() {
    axios.get('/');
  }

  getApplications() {
    axios.get('/api/applications/1')
      .then((data) => {
        console.log('get applications from server');
        this.setState({ applications: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className={seanStyleBox.box_94per_3perMg} />

        {/* <div className="box_94per_3perMg"> */}
        <div className={seanStyleBox.box_94per_3perMg}>
          <div className={seanStyleBox.PatrickStatusBar}>
            <h3>Patrick Status Bar</h3>
          </div>
        </div>

        <div className={seanStyleBox.box_94per_3perMg}>
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

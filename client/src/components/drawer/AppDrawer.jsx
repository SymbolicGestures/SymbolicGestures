import React from 'react';
import AppDrawerInfo from './AppDrawerInfo.jsx';
import AppDrawerNote from './AppDrawerNote.jsx';
import AppDrawerHistory from './AppDrawerHistory.jsx';
import AppDrawerContact from './AppDrawerContact.jsx';

import styles from '../../../styles/jerryStyleBox.css';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="JerryDrawer02">
        <h1>AppDrawer</h1>
        <AppDrawerInfo
          application={this.props.application}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
          stages_settings={this.props.stages_settings}
          stageNameToColorHash={this.props.stageNameToColorHash}
          updateOneAppStage={this.props.updateOneAppStage}
          selectAppIdx={this.props.selectAppIdx}
        />
        <AppDrawerNote application={this.props.application}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
        />
        <AppDrawerContact application={this.props.application}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
        />
        <AppDrawerHistory application={this.props.application}/>
      </div>
    );
  }
}

export default AppDrawer

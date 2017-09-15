import React from 'react';
import AppDrawerInfo from './AppDrawerInfo.jsx';
import AppDrawerNote from './AppDrawerNote.jsx';
import AppDrawerHistory from './AppDrawerHistory.jsx';
import AppDrawerContact from './AppDrawerContact.jsx';
import PropTypes from 'prop-types'

import styles from '../../../styles/drawer.css'

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.drawer}>
        <AppDrawerInfo
          application={this.props.application}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
          stages_settings={this.props.stages_settings}
          stageNameToColorHash={this.props.stageNameToColorHash}
          updateOneAppStage={this.props.updateOneAppStage}
          selectedAppIdx={this.props.selectedAppIdx}
        />
      <div className={styles.notesAndContacts}>
        <AppDrawerNote application={this.props.application} getApplicationsFromDB={this.props.getApplicationsFromDB}/>
        <AppDrawerContact application={this.props.application} getApplicationsFromDB={this.props.getApplicationsFromDB}/>
      </div>
        <AppDrawerHistory application={this.props.application}/>
      </div>
    );
  }
}

export default AppDrawer

AppDrawer.propTypes = {

}

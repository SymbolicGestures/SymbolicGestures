import React from 'react';
import AppDrawerInfo from './AppDrawerInfo.jsx';
import AppDrawerNote from './AppDrawerNote.jsx';
import AppDrawerHistory from './AppDrawerHistory.jsx';
import AppDrawerContact from './AppDrawerContact.jsx';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'
import axios from 'axios';


import styles from '../../../styles/drawer.css'

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteApplication = this.deleteApplication.bind(this);
  }

  deleteApplication() {
    let route = `/api/deleteApplication/${this.props.application.id}`;
    axios.post(route)
      .then(this.props.getApplicationsFromDB());
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
          selectAppIdx={this.props.selectAppIdx}
        />
      <div className={styles.notesAndContacts}>
        <AppDrawerNote application={this.props.application} getApplicationsFromDB={this.props.getApplicationsFromDB}/>
        <AppDrawerContact application={this.props.application} getApplicationsFromDB={this.props.getApplicationsFromDB}/>
      </div>
        <AppDrawerHistory application={this.props.application}/>

        <FlatButton
          label="Delete"
          style={{'float': 'left','color': 'red'}}
          primary={true}
          keyboardFocused={true}
          onClick={this.deleteApplication}
        />

    </div>
    );
  }
}

export default AppDrawer

AppDrawer.propTypes = {

}

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
        <h1
          style={{"color": "black", "marginLeft": "10px"}}
          >{this.props.application.company_name}</h1>
        <AppDrawerInfo
          application={this.props.application}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
          stages_settings={this.props.stages_settings}
          stageNameToColorHash={this.props.stageNameToColorHash}
          updateOneAppStage={this.props.updateOneAppStage}
          selectedAppIdx={this.props.selectedAppIdx}
          updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
          attemptWebScrape={this.props.attemptWebScrape}
        />
        <div className={styles.notesAndContacts}>
          <AppDrawerNote
            application={this.props.application}
            getApplicationsFromDB={this.props.getApplicationsFromDB}
            selectedAppIdx={this.props.selectedAppIdx}
            updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
          />
          <div>
            <AppDrawerContact
              application={this.props.application}
              getApplicationsFromDB={this.props.getApplicationsFromDB}
              selectedAppIdx={this.props.selectedAppIdx}
              updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
            />
            <FlatButton
              label="Delete App"
              style={{ 'float': 'right', 'color': 'red', opacity: .2 }}
              primary={true}
              keyboardFocused={true}
              onClick={this.deleteApplication}
            />
          </div>
        </div>
        <div>
          {/*<AppDrawerHistory application={this.props.application} />*/}
        </div>
      </div>
    );
  }
}

export default AppDrawer

AppDrawer.propTypes = {

}

import React from 'react';
import AppDrawerInfo from './appDrawerInfo.jsx';
import AppDrawerNote from './appDrawerNote.jsx';
import AppDrawerHistory from './appDrawerHistory.jsx';
import AppDrawerContact from './appDrawerContact.jsx';

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
        />
        <AppDrawerNote application={this.props.application} getApplicationsFromDB={this.props.getApplicationsFromDB}/>
        <AppDrawerContact application={this.props.application} getApplicationsFromDB={this.props.getApplicationsFromDB}/>
        <AppDrawerHistory application={this.props.application}/>
      </div>
    );
  }
}

export default AppDrawer

import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

import AppDrawer from './drawer/appDrawer.jsx';

export default class MateUiRightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const application = this.props.application || [];
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onClick={this.handleToggle}
        />
        <Drawer width={'70%'} openSecondary={true} open={this.state.open} >
          <AppDrawer application={this.props.application}/>
        </Drawer>
      </div>
    );
  }
}

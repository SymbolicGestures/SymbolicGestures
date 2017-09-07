import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, Segment, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { format } from 'date-fns';

import AppDrawer from './drawer/appDrawer.jsx';

const generateEmptyApplicaton = () => {
  let currentDate = format(new Date(), 'YYYY-MM-DD-ddd-HH-MM-ss');
  let emptyApplication = {
    created_at: currentDate,
    company_name: '',
    job_title: '',
    stage: '',
    job_posting_link: '',
    job_posting_source: '',
    applied_at: '',
    updated_at: '',
    locaton: '',
    job_posting_to_pdf_link: '',
    notes: [],
    histories: [],
    contacts: [],
  };
  return emptyApplication;
};

export default class MateUiRightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.setDrawerToOpen = this.setDrawerToOpen.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  setDrawerToOpen() {
    this.setState({ open: true });
  }

  // postEmptyApplicationToDB() {
  //   axios.post('/api/applications', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  openDrawer() {
    this.setState({ open: true });
  }

  closeDrawer() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        {/* #00bcd4 */}
        {/* <Button color="vk" style={{ backgroundColor: '#00bcd4' }}> */}
        <Button color="vk" onClick={this.openDrawer} >
          <Icon name="plus" /> Add Aplication
        </Button>

        <Drawer width={'70%'} openSecondary={true} open={this.state.open}>
          <Button
            attached="top"
            onClick={this.closeDrawer}
          > Close Drawer <Icon name="right chevron" /> </Button>
          <AppDrawer application={this.props.application} />
        </Drawer>
      </div>
    );
  }
}

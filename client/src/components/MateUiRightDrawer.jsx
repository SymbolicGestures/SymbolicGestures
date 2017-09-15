import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, Segment, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { format } from 'date-fns';


import AppDrawer from './drawer/AppDrawer.jsx';

const seanStyleBox = require('./../../styles/seanStyleBox.css');


const generateEmptyApplicaton = () => {
  // let currentDate = format(new Date(), 'YYYY-MM-DD-ddd-HH-MM-ss');
  let emptyApplication = {
    // created_at: currentDate,
    company_name: '',
    job_title: '',
    stage: 'Considering',
    job_posting_link: '',
    job_posting_source: '',
    // applied_at: '',
    // updated_at: '',
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
    this.openDrawerAndPostEmptyAppToDB = this.openDrawerAndPostEmptyAppToDB.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.isDrawerOpen);
    this.setState({ open: nextProps.isDrawerOpen });
  }

  postEmptyApplicationToDB(newApplication) {
    axios.post('/api/applications', newApplication)
      .then(function (response) {
        // console.log('post req empty application succeed');
        // console.log('id: ', response.data.id);
        // console.log('application_id', response.data.id);
        axios.post('/api/notes', {
          application_id: response.data.id,
          type: 'note',
          note: 'sample note'
        });
      })
      .catch(function (error) {
        // console.log('post req empty application failed');
        // console.log(error);
      });
  }

  openDrawerAndPostEmptyAppToDB() {
    let newApplication = generateEmptyApplicaton();
    this.props.createNewApplicationInFE(newApplication);
    this.postEmptyApplicationToDB(newApplication);
    this.props.openDrawer();
    this.setState({ open: true });
    // console.log('why?');
    this.props.getApplicationsFromDB(this.props.setSelectAppToNewApp);
  }
  closeDrawer() {
    this.setState({ open: false });
    this.props.closeDrawer();
  }

  render() {
    return (
      <div>
        <Button color="vk" onClick={this.openDrawerAndPostEmptyAppToDB} >
          <Icon name="plus" /> Add Application
        </Button>
        {/* {console.log('open state:', this.state.open)} */}
        <Drawer width={'70%'} openSecondary={true} open={this.state.open}>
          <Button
            attached="top"
            onClick={this.closeDrawer}
          > Close Drawer <Icon name="right chevron" />
          </Button>
          <AppDrawer
            application={this.props.application}
            getApplicationsFromDB={this.props.getApplicationsFromDB}
            stages_settings={this.props.stages_settings}
            stageNameToColorHash={this.props.stageNameToColorHash}
            updateOneAppStage={this.props.updateOneAppStage}
            selectedAppIdx={this.props.selectedAppIdx}
            updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
          />
        </Drawer>
      </div>
    );
  }
}

import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, Segment, Button, Icon, Form } from 'semantic-ui-react';
import axios from 'axios';
import { format } from 'date-fns';


import AppDrawer from './drawer/AppDrawer.jsx';

import AddBtnTrigInputForm from '../components/AddBtnTrigInputForm.jsx';

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

export default class MainDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isInputFormVisible: false,
    };
    this.openDrawerAndPostEmptyAppToDB = this.openDrawerAndPostEmptyAppToDB.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.hideInputForm = this.hideInputForm.bind(this);
    this.submitButtonClicked = this.submitButtonClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.isDrawerOpen });
  }

  postEmptyApplicationToDB(newApplication) {
    axios.post('/api/applications', newApplication)
      .then(function (response) {
        axios.post('/api/notes', {
          application_id: response.data.id,
          type: 'note',
          note: 'sample note'
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  openDrawerAndPostEmptyAppToDB() {
    let newApplication = generateEmptyApplicaton();
    this.props.createNewApplicationInFE(newApplication);
    this.postEmptyApplicationToDB(newApplication);
    this.setState({
      isInputFormVisible: true,
    });
    this.props.getApplicationsFromDB(this.props.setSelectAppToNewApp);
  }

  closeDrawer() {
    this.setState({ open: false });
    this.props.closeDrawer();
  }

  hideInputForm() {
    this.setState({ isInputFormVisible: false });
  }

  submitButtonClicked() {
    this.setState({ isInputFormVisible: false });
  }

  render() {
    let visibilityStyle = this.state.isInputFormVisible ? { visibility: 'visible' } : { visibility: 'hidden' };
    let submitButtStyle = Object.assign({ width: '15%', marginLeft: '1%' }, visibilityStyle);
    return (
      <div>


        <div className={seanStyleBox.box_for_addApplicationButtAndOther}>
          <Button color="vk" onClick={this.openDrawerAndPostEmptyAppToDB} style={{width: '15%'}}>
            <Icon name="plus" /> Add Application
          </Button>

          <AddBtnTrigInputForm
            isInputFormVisible={this.state.isInputFormVisible}
            hideInputForm={this.hideInputForm}
            submitButtonClicked={this.submitButtonClicked}
            emptyUserInput={''}
            attemptWebScrape={this.props.attemptWebScrape}
            updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
            selectedAppIdx={this.props.selectedAppIdx}
            application={this.props.application}
          />

          <Button
            onClick={this.submitButtonClicked}
            style={submitButtStyle}
            type="submit"
          > Submit
          </Button>
        </div>

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
            attemptWebScrape={this.props.attemptWebScrape}
          />
        </Drawer>
      </div>
    );
  }
}

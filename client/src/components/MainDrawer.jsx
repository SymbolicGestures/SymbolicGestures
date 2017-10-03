import React from 'react';
import Drawer from 'material-ui/Drawer';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';


import AppDrawer from './drawer/AppDrawer.jsx';

import MainDrawerAddBtnInputForm from '../components/MainDrawerAddBtnInputForm.jsx';

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
          <Button color="vk" onClick={this.openDrawerAndPostEmptyAppToDB} style={{ width: '15%' }}>
            <Icon name="plus" /> Add Application
          </Button>

          <MainDrawerAddBtnInputForm
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
          <div style={{'display': 'flex'}}>
            <Button
              style={{'display':'inline', 'width':'30px', 'padding':'0px', 'height': window.innerHeight,'position': 'relative'}}
              attached="top"
              onClick={this.closeDrawer}
            >
              <Icon
                name="right chevron"
                style={{'position': 'relative', 'margin': '0px', 'top': (window.innerHeight*2/5)}}
              />
              <Icon
                name="right chevron"
                style={{'position': 'relative',  'margin': '0px', 'top': (window.innerHeight*3/5)}}
              />
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
          </div>
        </Drawer>
      </div>
    );
  }
}

MainDrawer.propTypes = {
  application: PropTypes.object,
  isDrawerOpen: PropTypes.bool,
  closeDrawer: PropTypes.func,
  getApplicationsFromDB: PropTypes.func,
  setSelectAppToNewApp: PropTypes.func,
  stages_settings: PropTypes.array,
  stageNameToColorHash: PropTypes.object,
  updateOneAppStage: PropTypes.func,
  selectedAppIdx: PropTypes.number,
  createNewApplicationInFE: PropTypes.func,
  updateOneKeyValPairInFE: PropTypes.func,
  attemptWebScrape: PropTypes.func,
};

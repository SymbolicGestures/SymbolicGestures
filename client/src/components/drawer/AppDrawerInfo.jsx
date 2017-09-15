import React from 'react';
import TextField from 'material-ui/TextField';
import MiniStageBar from '../miniStageBar/MiniStageBar.jsx';
import axios from 'axios';
import PropTypes from 'prop-types'

import AppDrawerInfoDropDown from './AppDrawerInfoDropDown.jsx'
import styles from '../../../styles/drawer.css';

class AppDrawerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: '',
      applied_at: '',
      job_title: '',
      stage: '',
      job_posting_source: '',
      job_posting_link: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.createHistoryEntry = this.createHistoryEntry.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      company_name: nextProps.application.company_name,
      applied_at: nextProps.application.applied_at,
      job_title: nextProps.application.job_title,
      stage: nextProps.application.stage,
      job_posting_source: nextProps.application.job_posting_source,
      job_posting_link: nextProps.application.job_posting_link
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let stageChanged = prevProps.application.stage !== this.props.application.stage;
  //   let idChanged = prevProps.application.id !== this.props.application.id;
  //   if (stageChanged && !idChanged) {
  //     this.createHistoryEntry(this.props.application.id, prevProps.application.stage, this.props.application.stage);
  //   }
  // }

  handleChange(event) {
    let key = event.target.id;
    let val = event.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  handleBlur(event) {
    let route = `/api/applications/${this.props.application.id}`;
    let key = event.target.id;
    let val = event.target.value;
    let body = {};
    body[key] = val;
    axios.post(route, body)
      .then(this.props.getApplicationsFromDB());
    // .then((message) => {console.log(message)})
  }


  createHistoryEntry(application_id, oldStage, newStage) {
    let eventText = "Stage was changed from " + oldStage + " to " + newStage;
    let route = '/api/histories/';
    let body = {'event' : eventText, application_id};
    // console.log(' new history: ', application_id, eventText)
    axios.post(route, body)
      .then(this.props.getApplicationsFromDB());
  }


  render() {
    return (
      <div className={styles.application}>
        {/*<h1>Application</h1>*/}
        <MiniStageBar
          stages={this.props.stages_settings}
          stage={this.props.application.stage}
          application={this.props.application}
          updateOneAppStage={this.props.updateOneAppStage}
          selectedAppIdx={this.props.selectedAppIdx}
        />
      {/*
        <AppDrawerInfoDropDown
        className={styles.stageSelection}
        getApplicationsFromDB={this.props.getApplicationsFromDB}
        application={this.props.application}
        stages_settings={this.props.stages_settings}
        stageNameToColorHash={this.props.stageNameToColorHash}
        stage={this.props.application.stage}
        updateOneAppStage={this.props.updateOneAppStage}
        selectedAppIdx={this.props.selectedAppIdx}
        />
        */}
        <div className={styles.applicationInfo}>
          <div className={styles.appInfo_col_1}>
            <TextField
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="applied_at"
              value={this.state.applied_at || ''}
              floatingLabelText='applied_at'
            />
            <TextField
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="company_name"
              value={this.state.company_name || ''}
              floatingLabelText='company_name'
            />
            <TextField
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="job_title"
              value={this.state.job_title || ''}
              floatingLabelText='job_title'
            />
          </div>


          {/* <TextField
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="created_at"
            value={this.state.created_at || ''}
            floatingLabelText='created_at'
            /> */}

            {/* {console.log('application:', this.props.application)} */}

            <div className={styles.appInfo_col_2}>
              <TextField
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                id="job_posting_source"
                value={this.state.job_posting_source || ''}
                floatingLabelText='job_posting_source'
                />
              <TextField
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                id="job_posting_link"
                value={this.state.job_posting_link || ''}
                floatingLabelText='job_posting_link'
                />
            </div>
            {/* <TextField
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="stage"
              value={this.state.stage || ''}
              floatingLabelText='stage'
              /> */}

            {/*
              <TextField
              onChange={this.handleChange}
              id="applied_at"
              value={this.props.application.applied_at}
              />

              <TextField
              onChange={this.handleChange}
              id="updated_at"
              value={this.props.application.updated_at}
              />

              <TextField
              onChange={this.handleChange}
              id="locaton"
              value={this.props.application.locaton}
              />

              <TextField
              onChange={this.handleChange}
              id="job_posting_to_pdf_link"
              value={this.props.application.job_posting_to_pdf_link}
              /> */}
        </div>
     </div>
    );
  }
}

export default AppDrawerInfo;

AppDrawerInfo.propTypes = {
  
}

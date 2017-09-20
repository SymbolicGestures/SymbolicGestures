import React from 'react';
import TextField from 'material-ui/TextField';
import MiniStageBar from '../miniStageBar/MiniStageBar.jsx';
import axios from 'axios';
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'
import AppDrawerInfoDropDown from './AppDrawerInfoDropDown.jsx'
import styles from '../../../styles/drawer.css';
import currencyFormatter from 'currency-formatter';
import DatePicker from 'material-ui/DatePicker';
import { format, parse } from 'date-fns';


class AppDrawerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: '',
      applied_at: '',
      job_title: '',
      stage: '',
      job_posting_source: '',
      job_posting_link: '',
      salary: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChangeSalary = this.handleChangeSalary.bind(this);
    this.handleBlurSalary = this.handleBlurSalary.bind(this);
    this.createHistoryEntry = this.createHistoryEntry.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      company_name: nextProps.application.company_name,
      applied_at: parse(nextProps.application.applied_at || new Date()),
      job_title: nextProps.application.job_title,
      stage: nextProps.application.stage,
      job_posting_source: nextProps.application.job_posting_source,
      job_posting_link: nextProps.application.job_posting_link,
      salary: currencyFormatter.format(nextProps.application.salary, { code: 'USD', precision: 0 })
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

  handleChangeDate(event, date) {
    let key = 'applied_at';
    let val = date;
    let obj = {};
    obj[key] = val;
    this.setState(obj);

    let route = `/api/applications/${this.props.application.id}`
    let body = {};
    body[key] = val.toISOString();
    this.props.updateOneKeyValPairInFE(this.props.selectedAppIdx, key, val.toISOString());
    axios.post(route, body)
    .then(this.props.getApplicationsFromDB())
  }

  handleChangeSalary(event) {
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
    this.props.updateOneKeyValPairInFE(this.props.selectedAppIdx, key, val);
    axios.post(route, body)
      .then(this.props.getApplicationsFromDB());
  }

  handleBlurSalary(event) {
    let route = `/api/applications/${this.props.application.id}`;
    let key = event.target.id;
    let val = event.target.value.replace(/\D/g,'');
    let body = {};
    body[key] = val;
    this.props.updateOneKeyValPairInFE(this.props.selectedAppIdx, key, val);
    axios.post(route, body)
      .then(this.props.getApplicationsFromDB());
  }


  createHistoryEntry(application_id, oldStage, newStage) {
    let eventText = "Stage was changed from " + oldStage + " to " + newStage;
    let route = '/api/histories/';
    let body = {'event' : eventText, application_id};
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
       <div className={styles.companyLogo}>
         <img src={this.props.application.job_company_logo} />
       </div>
        <div className={styles.applicationInfo}>
          <div className={styles.appInfo_col_1}>
            {/* <TextField
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="applied_at"
              value={this.state.applied_at || ''}
              floatingLabelText='applied_at'
            /> */}
            <DatePicker
              floatingLabelText="applied_at"
              value={this.state.applied_at || {}}
              onChange={this.handleChangeDate}
              autoOk={true}
              container="inline"
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


            <div className={styles.appInfo_col_2}>
              <TextField
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                id="job_posting_source"
                value={this.state.job_posting_source || ''}
                floatingLabelText='job_posting_source'
                />
              <div className={styles.jobLinkRow}>
                {/*<input
                  type='button'
                  value='Get Info'
                  onClick={
                    () => {this.props.attemptWebScrape(this.props.selectedAppIdx, this.state.job_posting_link);
                  }}
                />*/}
                <TextField
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  id="job_posting_link"
                  value={this.state.job_posting_link || ''}
                  floatingLabelText='job_posting_link'
                />
                <div className={styles.tooltip}>
                  <Icon

                    onClick={
                      () => {this.props.attemptWebScrape(this.props.selectedAppIdx, this.state.job_posting_link);
                    }}
                    name='edit'
                  />
                <p className={styles.tooltiptext}>Autofill</p>
                </div>

              </div>
              <TextField
                onBlur={this.handleBlurSalary}
                onChange={this.handleChangeSalary}
                id="salary"
                value={this.state.salary || ''}
                floatingLabelText='salary'
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

import React, { Component } from 'react';
import { Table, Segment, Button, Icon, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';


export default class MainDrawerAddBtnInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      formView: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userInput: nextProps.emptyUserInput
    });
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  handleSubmit() {
    this.props.submitButtonClicked();
    this.props.attemptWebScrape(0, this.state.userInput);
    this.props.updateOneKeyValPairInFE(this.props.selectedAppIdx, 'job_posting_link', this.state.userInput);
    // updateOneKeyValPairInFE(idx, updatedField, updatedText)
    this.updateOneKeyValPairToDB(this.props.application, 'job_posting_link', this.state.userInput);
    this.setState({ userInput: '' });
  }

  updateOneKeyValPairToDB(application, appKey, appVal) {
    let route = `/api/applications/${application.id}`;
    let key = appKey;
    let val = appVal;
    let body = {};
    body[key] = val;
    axios.post(route, body)
      .then( (app) => {
      })
      .catch((message) => { console.log(message); });
  }

  render() {
    let visibilityStyle = this.props.isInputFormVisible ? { visibility: 'visible' } : { visibility: 'hidden' };
    let formStyle = Object.assign({ width: '70%', height: '100%' }, visibilityStyle);
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={formStyle}
      >
        <Form.Field>
          {/* ref={input => input && input.focus()} */}
          <input
            ref={input => input && input.focus()} 
            onChange={this.handleChange}
            value={this.state.userInput}
            placeholder="Type Indeed job posting link to auto-fill data "
            onBlur={this.handleSubmit}
          />
        </Form.Field>
      </Form>
    );
  }
}

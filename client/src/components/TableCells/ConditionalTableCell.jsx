import React, { Component } from 'react';
import { Table, Form } from 'semantic-ui-react';
import axios from 'axios';

class ConditionalTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      formView: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateOneKeyValPairToDB = this.updateOneKeyValPairToDB.bind(this);
    this.activateFormView = this.activateFormView.bind(this);
    this.deActivateFormView = this.deActivateFormView.bind(this);
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  handleSubmit(idx, updatedField, application, e) {
    this.props.updateOneKeyValPairInFE(idx, updatedField, this.state.userInput);
    this.updateOneKeyValPairToDB(application, updatedField);
    e.preventDefault();
  }

  updateOneKeyValPairToDB(application, appKey) {
    let route = `/api/applications/${application.id}`;
    let key = appKey;
    let val = application[appKey];
    let body = {};
    body[key] = val;
    axios.post(route, body)
      .then(console.log('Able to post one app key val pair to DB'))
      .catch((message) => { console.log(message); });
  }

  activateFormView() {
    this.setState({ formView: true });
  }

  deActivateFormView(idx, updatedField, application) {
    this.props.updateOneKeyValPairInFE(idx, updatedField, this.state.userInput);
    this.updateOneKeyValPairToDB(application, updatedField);
    this.setState({ formView: false });
  }

  render() {
    if (this.props.appKey === 'job_posting_link'
      && this.props.application[this.props.appKey] !== ''
      && this.props.application[this.props.appKey] !== null) {
      return (
        <Table.Cell
          style={{ textAlign: 'center' }}
        ><a href={this.props.application[this.props.appKey]}><u>Link</u></a></Table.Cell>
      );
    }
  
    if (this.props.application[this.props.appKey] === null) {
      return (
        <Table.Cell style={this.props.cellStyle}>
          <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.appKey, this.props.application, e)}>
            <Form.Field>
              <input
                onChange={this.handleChange}
                onBlur={() => this.deActivateFormView(this.props.idx, this.props.appKey, this.props.application)}
                value={this.state.value}
                placeholder={this.props.placeHolder}
              />
            </Form.Field>
          </Form>
        </Table.Cell>
      );
    }
  

    if (this.props.application[this.props.appKey].length !== 0) {
      return (<Table.Cell>{this.props.application[this.props.appKey]}</Table.Cell>);
    }

    return (
      <Table.Cell style={this.props.cellStyle}>
        <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.appKey, this.props.application, e)}>
          <Form.Field>
            <input
              onChange={this.handleChange}
              onBlur={() => this.deActivateFormView(this.props.idx, this.props.appKey, this.props.application)}
              value={this.state.value}
              placeholder={this.props.placeHolder}
            />
          </Form.Field>
        </Form>
      </Table.Cell>
    );
  }
}

export default ConditionalTableCell;








import React, { Component } from 'react';
import { Table, Form } from 'semantic-ui-react';
import axios from 'axios';

class ConditionalTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateOneKeyValPairToDB = this.updateOneKeyValPairToDB.bind(this);
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

  render() {
    if (this.props.application[this.props.appKey]) {
      return (<Table.Cell>{this.props.application[this.props.appKey]}</Table.Cell>);
    }
    return (
      <Table.Cell style={this.props.cellStyle}>
        <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.appKey, this.props.application, e)}>
          <Form.Field>
            <input
              onChange={this.handleChange}
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








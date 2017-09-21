import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'semantic-ui-react';
import axios from 'axios';

class ConditionalTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      formView: false,
      isClicked: false,
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

  activateFormView(value) {
    this.setState({ userInput: value, formView: true, isClicked: true });
  }

  deActivateFormView(idx, updatedField, application) {
    this.props.updateOneKeyValPairInFE(idx, updatedField, this.state.userInput);
    this.updateOneKeyValPairToDB(application, updatedField);
    this.setState({ userInput: '', formView: false });
  }

  render() {
    if (this.props.appKey === 'job_posting_source'
      && this.props.application[this.props.appKey] !== ''
      && this.state.formView === false
      && this.props.application[this.props.appKey] !== null) {
      return (
        <Table.Cell
          onClick={() => this.activateFormView(this.props.application[this.props.appKey])}
          style={{ textAlign: 'center' }}
        >
          <a href={this.props.application['job_posting_link']}>
            <u>{this.props.application[this.props.appKey]}</u>
          </a>
        </Table.Cell>
      );
    }

    if (this.props.application[this.props.appKey] === null || this.state.formView === true) {
      if (this.state.isClicked === true) {
        return (
          <Table.Cell style={this.props.cellStyle}>
            <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.appKey, this.props.application, e)}>
              <Form.Field>
                <input
                  ref={input => input && input.focus()} 
                  onChange={this.handleChange}
                  onBlur={() => {
                    this.deActivateFormView(this.props.idx, this.props.appKey, this.props.application);
                    if (this.props.placeHolder === 'Link') {
                      this.props.attemptWebScrape(this.props.idx, this.state.userInput);
                    }
                  }}
                  value={this.state.userInput}
                  placeholder={this.props.placeHolder}
                />
              </Form.Field>
            </Form>
          </Table.Cell>
        );
      }
      return (
        <Table.Cell style={this.props.cellStyle}>
          <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.appKey, this.props.application, e)}>
            <Form.Field>
              <input
                onChange={this.handleChange}
                onBlur={() => {
                  this.deActivateFormView(this.props.idx, this.props.appKey, this.props.application);
                  if (this.props.placeHolder === 'Source Link') {
                    this.props.attemptWebScrape(this.props.idx, this.state.userInput);
                  }
                }}
                value={this.state.userInput}
                placeholder={this.props.placeHolder}
              />
            </Form.Field>
          </Form>
        </Table.Cell>
      );
    }


    if (this.props.application[this.props.appKey].length !== 0 && this.state.formView === false) {
      return (<Table.Cell
        onClick={() => this.activateFormView(this.props.application[this.props.appKey])}
      >
        {this.props.application[this.props.appKey]}
      </Table.Cell>);
    }

    return (
      <Table.Cell style={this.props.cellStyle}>
        <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.appKey, this.props.application, e)}>
          <Form.Field>
            <input
              onChange={this.handleChange}
              onBlur={() => this.deActivateFormView(this.props.idx, this.props.appKey, this.props.application)}
              value={this.state.userInput}
              placeholder={this.props.placeHolder}
            />
          </Form.Field>
        </Form>
      </Table.Cell>
    );
  }
}

export default ConditionalTableCell;

// Parent: DrawerAndApplicationTable.jsx
ConditionalTableCell.propTypes = {
  application: PropTypes.object,
  appKey: PropTypes.string,
  placeHolder: PropTypes.string,
  updateOneKeyValPairInFE: PropTypes.func,
  attemptWebScrape: PropTypes.func,
  idx: PropTypes.number,
  cellStyle: PropTypes.object,
};

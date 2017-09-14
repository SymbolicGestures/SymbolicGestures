import React, { Component } from 'react';
import { Table, Form } from 'semantic-ui-react';

class ConditionalTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  handleSubmit(idx, updatedField, e) {
    this.props.updateOneAppInFrontEnd(idx, updatedField, this.state.userInput);
    e.preventDefault();
  }

  render() {
    if (this.props.applicationKey) {
      return (<Table.Cell>{this.props.applicationKey}</Table.Cell>);
    }
    return (
      <Table.Cell style={this.props.cellStyle}>
        <Form onSubmit={e => this.handleSubmit(this.props.idx, this.props.applicationKeyInStr, e)}>
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








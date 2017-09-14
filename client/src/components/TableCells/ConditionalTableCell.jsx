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
    console.log(console.log('val:', e.target.value));
    this.setState({ userInput: e.target.value });
  }

  handleSubmit(idx, updatedField, e) {
    // alert('A name was submitted: ' + this.state.value);
    console.log('handle submit');
    console.log('idx', idx);
    console.log('updatedField', updatedField);
    console.log('value', this.state.userInput);
    // this.props.updateOneAppInFrontEnd()
    this.props.updateOneAppInFrontEnd(idx, updatedField, this.state.userInput);
    e.preventDefault();
  }

  render() {
    console.log('udtOneAppInFE:', this.props.updateOneAppInFrontEnd);
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








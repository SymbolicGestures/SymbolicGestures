import React, { Component } from 'react';
import { Table, Form } from 'semantic-ui-react';

class TableCellJPSource extends Component {
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
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    // alert('A name was submitted: ' + this.state.value);
    console.log('handle submit');
    e.preventDefault();
  }

  render() {
    if (this.props.job_posting_source) {
      return (<Table.Cell>{this.props.job_posting_source}</Table.Cell>);
    }
    return (
      <Table.Cell style={{ padding: '0.2% 0.2% 0px 0.2%', width: '10%' }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input onChange={this.handleChange} value={this.state.value} placeholder="Source" />
          </Form.Field>
        </Form>
      </Table.Cell>
    );
  }
}

export default TableCellJPSource;








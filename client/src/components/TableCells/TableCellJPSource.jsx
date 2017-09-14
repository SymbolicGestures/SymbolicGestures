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
    this.setState({ userInput: e.target.value });
  }

  handleSubmit(idx, updatedField, e) {
    // alert('A name was submitted: ' + this.state.value);
    console.log('handle submit');
    console.log('idx', idx);
    console.log('updatedField', updatedField);
    console.log('value', this.state.userInput);
    // this.props.updateOneKeyValPairInFE()
    this.props.updateOneKeyValPairInFE(idx, updatedField, this.state.userInput)
    e.preventDefault();
  }

  render() {
    console.log('udtOneAppInFE:', this.props.job_posting_source.length !== 0);
    if (this.props.job_posting_source.length !== 0) {
      return (<Table.Cell>{this.props.job_posting_source}</Table.Cell>);
    }
    return (
      <Table.Cell style={{ padding: '0.2% 0.2% 0px 0.2%', width: '10%' }}>
        <Form onSubmit={(e) => (this.handleSubmit(this.props.idx, 'job_posting_source', e))}>
          <Form.Field>
            <input onChange={this.handleChange} value={this.state.value} placeholder="Source" />
          </Form.Field>
        </Form>
      </Table.Cell>
    );
  }
}

export default TableCellJPSource;








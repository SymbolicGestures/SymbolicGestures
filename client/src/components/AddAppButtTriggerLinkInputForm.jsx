import React, { Component } from 'react';
import { Table, Segment, Button, Icon, Checkbox, Form } from 'semantic-ui-react';


export default class AddAppButtTriggerLinkInputForm extends Component {
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
    this.setState({ userInput: '' });
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


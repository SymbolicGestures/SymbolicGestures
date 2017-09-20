import React, { Component } from 'react';
import { Table, Segment, Button, Icon, Checkbox, Form } from 'semantic-ui-react';
// import DatePicker from 'react-datepicker';
import { Calendar } from 'react-date-range';

export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      someState: ''
    };
  }


  handleSelect(date) {
  }

  render() {
    return (
      <div>
        
        <h1>ss</h1>
        <Calendar
          onInit={this.handleSelect}
          onChange={this.handleSelect}
        />
      </div>
    );
  }
}

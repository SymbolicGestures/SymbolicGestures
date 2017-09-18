import React from 'react';
import axios from 'axios';

<<<<<<< HEAD
import { Card, Icon } from 'semantic-ui-react';
=======
import { Card } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import DatePicker from 'material-ui/DatePicker';
>>>>>>> Datepick icon renders under date

import styles from '../../../styles/jerryStyleBox.css';

class AppDrawerContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlledDate: null,
    };
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
  }

  handleChange(event, date) {
    this.setState({
      controlledDate: date,
    });
  }

  handleDeleteContact(event) {
    let route = `/api/deleteContact/${this.props.contact.id}`
    axios.post(route)
      .then(this.props.getApplicationsFromDB())
  }

  handleEdit(event) {
    console.log('edit the contact with this id:' , this.props.contact.id)
  }
  openDatePicker(){
    this.refs.datepicker.openDialog()
  }

  render() {
    return (
      <div className={styles.contact}>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon link name='close' onClick={this.handleDeleteContact}/>
              </Card.Header>
              <Card.Header>{this.props.contact.name}</Card.Header>

              <Card.Meta>{this.props.contact.role}</Card.Meta>
              <Card.Description>{this.props.contact.email}</Card.Description>
              <Card.Description>{this.props.contact.phone}</Card.Description>
              <div style={{display:'inline'}}>
                <Card.Description style={{display:'inline'}}>
                  {"Last contact: " + this.props.contact.last_contact_date.slice(0,10)}
                </Card.Description>
                <Icon link name='calendar' onClick={this.openDatePicker}/>
              </div>

              <DatePicker
                ref='datepicker'
                style={{display: 'none'}}
                hintText="Controlled Date Input"
                value={this.state.controlledDate}
                onChange={this.handleChange}
              />

            </Card.Content>
          </Card>
      </div>
    );
  }
}

export default AppDrawerContactItem;

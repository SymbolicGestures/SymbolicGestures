import React from 'react';
import axios from 'axios';

import { Card, Icon } from 'semantic-ui-react';

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
            <Card.Description>{"Last contact: " + this.props.contact.last_contact_date.slice(0,10)}</Card.Description> 
            {/* <DatePicker
                selected={this.state.controlledDate}
                onChange={this.handleChange}
            /> */}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AppDrawerContactItem;

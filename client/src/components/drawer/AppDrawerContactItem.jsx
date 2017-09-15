import React from 'react';
import axios from 'axios';

import { Card } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

import styles from '../../../styles/jerryStyleBox.css';

class AppDrawerContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
            </Card.Content>
          </Card>
      </div>
    );
  }
}

export default AppDrawerContactItem;

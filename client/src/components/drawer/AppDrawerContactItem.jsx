import React from 'react';
import axios from 'axios';

import { Card, Icon } from 'semantic-ui-react';
import DatePicker from 'material-ui/DatePicker';

import styles from '../../../styles/jerryStyleBox.css';

class AppDrawerContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_contact_date: '',
    };
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.findLinkedInAndSend = this.findLinkedInAndSend.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      last_contact_date: nextProps.contact.last_contact_date
    });
  }


  handleChangeDate(event, date) {
    let key = 'last_contact_date';
    let val = date;
    let route = `/api/contacts/${this.props.contact.id}`
    let body = {};
    body[key] = val.toISOString();
    this.setState({
      last_contact_date: date.toISOString(),
    });
    axios.post(route, body);
    this.props.getApplicationsFromDB();
  }

  handleDeleteContact(event) {
    let route = `/api/deleteContact/${this.props.contact.id}`
    axios.post(route)
      .then(this.props.getApplicationsFromDB())
  }

  handleEdit(event) {
    console.log('edit the contact with this id:', this.props.contact.id);
  }

  openDatePicker() {
    this.refs.datepicker.openDialog()
  }

  findLinkedInAndSend(e) {
    axios.post('/api/findContact', {
      email: this.props.contact.email
    })
      .then(url => {
        window.open(
          url.data,
          '_blank'
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={styles.contact}>
        <Card>
          <Card.Content
            style={{"minHeight": '166px'}}
            >
            <Card.Header>
              <Icon style={{ opacity: .1 }} link name='close' onClick={this.handleDeleteContact} />
            </Card.Header>

            <Card.Header>{this.props.contact.name}</Card.Header>

            <Card.Meta>{this.props.contact.role}</Card.Meta>

            <div style={{ display: 'inline' }}>
              <Card.Description style={{ display: 'inline' }}>{this.props.contact.email}</Card.Description>
              <Icon link name='linkedin square' onClick={this.findLinkedInAndSend} />
            </div>

            <Card.Description>{this.props.contact.phone}</Card.Description>

            <div style={{ display: 'inline' }}>
              <Card.Description style={{ display: 'inline' }}>
                {"Last contact: " + this.state.last_contact_date.slice(0, 10) + "   "}
              </Card.Description>
              <Icon link name='calendar' onClick={this.openDatePicker} />
            </div>

            <DatePicker
              ref='datepicker'
              style={{ display: 'none' }}
              hintText="Controlled Date Input"
              // value={this.state.controlledDate}
              onChange={this.handleChangeDate}
              autoOk={true}
            />

          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AppDrawerContactItem;

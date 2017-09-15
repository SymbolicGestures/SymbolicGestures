import React from 'react';
import AppDrawerContactItem from './AppDrawerContactItem.jsx'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import styles from '../../../styles/drawer.css'

import axios from 'axios';

class AppDrawerContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      role: '',
      phone: ''
    };
    this.props.application.contacts = this.props.application.contacts || [];

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createHistoryEntry = this.createHistoryEntry.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

/**
 * [ close the dialog box, erases existing value in the fields]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
  handleClose(data) {
    this.setState({
      open: false,
      name: '',
      email: '',
      role: '',
      phone: ''
    })
  };

  handleSubmit(event) {
    let newContact = {
      application_id: this.props.application.id,
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      phone: this.state.phone,
    }

    let route = '/api/contacts/';

    axios.post(route,newContact)
    .then(this.props.getApplicationsFromDB());

    this.createHistoryEntry(event)

    this.handleClose(event);
  }

  createHistoryEntry(event) {
    let eventText = "Created a contact : " + this.state.name;
    let route = '/api/histories/';
    let application_id = this.props.application.id;

    let body = {'event' : eventText, application_id};
    axios.post(route,body)
    .then(this.props.getApplicationsFromDB());
  }

// handle input change for all 4 fields, get id from event and change corresponding state value
  handleChange(event) {
    var key = event.target.id;
    var val = event.target.value;
    var obj  = {};
    obj[key] = val;
    this.setState(obj);
  };


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div className={styles.contacts}>
        <h1>Contacts</h1>
        <div className={styles.contactInfo}>
          <RaisedButton label="Add Contact" onClick={this.handleOpen} primary={true}/>
          <Dialog
            title="Enter Contact Info"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div>
              <TextField
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
                floatingLabelText="name"
              /> <br />
              <TextField
                id="role"
                value={this.state.role}
                onChange={this.handleChange}
                floatingLabelText="role"
              /> <br />
              <TextField
                id="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                floatingLabelText="phone"
              /> <br />
              <TextField
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                floatingLabelText="email"
              />
            </div>

          </Dialog>
        </div>

        {this.props.application.contacts.map((contact,index) => {
          return (
            <AppDrawerContactItem
              contact={contact}
              key={index}
              getApplicationsFromDB={this.props.getApplicationsFromDB}
            />
          );
        })}


      </div>
    );
  }
}

export default AppDrawerContact;

import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

const seanStyleBox = require('./../../styles/seanStyleBox.css');

export default class MateUiRightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const application = this.props.application || [];
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onClick={this.handleToggle}
        />
        <Drawer width={'70%'} openSecondary={true} open={this.state.open} >
          <div className={seanStyleBox.box_w100per_h70px}> {application.createdAt} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.companyName} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.jobTitle} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.stage} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.jobPostingLink} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.jobPostingSource} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.appliedAt} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.updatedAt} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.locaton} </div>
          <div className={seanStyleBox.box_w100per_h70px}> {application.jobPostingToPdfLink} </div>
          <div className={seanStyleBox.box_w100per_h70px}>
            {application.notes.map((note) => {
              return (
                <p>{note.type + '////' + note.note }</p>
              );
            })}
          </div>
          <div className={seanStyleBox.box_w100per_h70px}>
            {application.histories.map((history) => {
              return (
                <p>{history.date + '////' + history.event }</p>
              );
            })}
          </div>
          <div className={seanStyleBox.box_w100per_h70px}>
            {application.contacts.map((contact) => {
              return (
                <p>
                  {
                    contact.name + '////'
                  + contact.role + '////'
                  + contact.email + '////'
                  + contact.phone + '////'
                  }
                </p>
              );
            })}
          </div>
        </Drawer>
      </div>
    );
  }
}

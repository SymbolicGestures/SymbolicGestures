import React from 'react';
import AppDrawerNoteItem from './appDrawerNoteItem.jsx';

class AppDrawerNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>AppDrawerNote</h2>
        <AppDrawerNoteItem application={this.props.application} />
      </div>
    );
  }
}


export default AppDrawerNote;

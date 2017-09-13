import React from 'react';
import AppDrawerNoteItem from './AppDrawerNoteItem.jsx';

class AppDrawerNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.application.notes = this.props.application.notes || [];
  }

  render() {
    return (
      <div>
        <h2>Notes</h2>
        <AppDrawerNoteItem
          note={this.props.application.notes}
          key={0}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
        />

        {/* {this.props.application.notes.map((note,index) => {
          return ( );
        })} */}
      </div>
    );
  }
}


export default AppDrawerNote;

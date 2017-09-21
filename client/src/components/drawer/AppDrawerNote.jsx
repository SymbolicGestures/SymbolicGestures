import React from 'react';
import AppDrawerNoteItem from './AppDrawerNoteItem.jsx';
import styles from '../../../styles/drawer.css'

class AppDrawerNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.application.notes = this.props.application.notes || [];
  }

  render() {
    return (
      <div className={styles.notes}>
        <h1>Notes</h1>
        <AppDrawerNoteItem
          note={this.props.application.notes}
          key={0}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
        />
      </div>
    );
  }
}


export default AppDrawerNote;

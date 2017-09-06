import React from 'react';
import AppDrawerHistoryItem from './appDrawerHistoryItem.jsx';

class AppDrawerHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.application.histories = this.props.application.histories || [];

  }

  render() {
    return (
      <div>
        <h2>AppDrawerHistory</h2>
        {this.props.application.histories.map((history, index) => {
          return (
            <AppDrawerHistoryItem history={history} key={index}/>
          );
        })}
      </div>
    );
  }
}

export default AppDrawerHistory;

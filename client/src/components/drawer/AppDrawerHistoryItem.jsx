import React from 'react';

const AppDrawerHistoryItem = (props) => {
  return (
    <div >
      {props.history.created_at.slice(0, 10) + ':  ' + props.history.event}
    </div>
  );
};
export default AppDrawerHistoryItem;

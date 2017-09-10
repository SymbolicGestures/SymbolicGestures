import React from 'react'
// import styles from './../../../styles/analyticsStyles.css'
import PropTypes from 'prop-types'
import TimelineGraph from './TimelineGraph.jsx'
import { Dropdown } from 'semantic-ui-react';

class Analytics extends React.Component {
  constructor() {
    super();
    this.state={
      stage: 'OFFER'
    };
    this.handleStageChange = this.handleStageChange.bind(this);
  }

  handleStageChange(e) {
    this.setState({
      stage: e.target
    });
  }
  render() {
    return (
      <div>
        <div style={{height:"66px"}}></div>
        <div>
          Analytics by stage: <Dropdown onChange={this.handleStageChange} inline defaultValue={[{text: 'OFFER', value: 'OFFER'}, {text: 'Declined', value: 'Declined'}][0].value} options={[{text: 'OFFER', value: 'OFFER'}, {text: 'Declined', value: 'Declined'}]} />
        </div>
        <TimelineGraph
          stage = {"OFFER"}
        />
      </div>
    )
  }
}

export default Analytics;

Analytics.propTypes = {
  // navBarIsHidden: PropTypes.bool
}

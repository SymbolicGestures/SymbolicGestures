import React from 'react'
// import styles from './../../../styles/analyticsStyles.css'
import PropTypes from 'prop-types'
import SocialGraph from './SocialGraph.jsx'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import { parse, format, addDays, subDays, isToday } from 'date-fns';

class Analytics extends React.Component {
  constructor() {
    super();
    this.state={

    };
  }
  componentWillMount() {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  getAllStages() {

  }

  handleStageChange(e, data) {
    this.setState({
    });

  }
  render() {
    return (
      <div>
        <div style={{height:"66px"}}></div>
        <div>
          {/* Analytics by stage: <Dropdown onChange={this.handleStageChange} inline options={this.state.stages} defaultValue={this.state.stage}/> */}
        </div>
        <SocialGraph
          socialGraphData={[
            {name: 'under $60K', count: 2, percentage: 20},
            {name: '$60K to $69,999', count: 1, percentage: 35},
            {name: '$70K to $79,999', count: 3, percentage: 40},
            {name: 'over $80K', count: 4, percentage: 10}
          ]}
        />
      </div>
    )
  }
}

export default Analytics;

Analytics.propTypes = {
}

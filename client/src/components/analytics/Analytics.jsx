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
        />
      </div>
    )
  }
}

export default Analytics;

Analytics.propTypes = {
}

import React from 'react'
// import styles from './../../../styles/analyticsStyles.css'
import PropTypes from 'prop-types'
import TimelineGraph from './TimelineGraph.jsx'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'

class Analytics extends React.Component {
  constructor() {
    super();
    this.state={
      stage: 'OFFER',
      stages: [],
      applications: []
    };
    this.handleStageChange = this.handleStageChange.bind(this);
  }
  componentWillMount() {
    axios.get('/api/profiles')
      .then((profile) => {
        let stagesData = profile.data.stages_settings.map((item) => {
          return {
            text: item.name,
            value: item.name
          }
        })
        this.setState({
          stages: stagesData,
          stage: this.state.stages || stagesData[stagesData.length - 1]['value']
        })
      })
      // .then(() => {
      //   axios.get(`/api/applications/${this.state.stage}`)
      //     .then((applications) => {
      //       this.setState({
      //         applications: applications
      //       })
      //     })
      // })
  }

  handleStageChange(e, data) {
    this.setState({
      stage: data.value
    });

  }
  render() {
    return (
      <div>
        <div style={{height:"66px"}}></div>
        <div>
          Analytics by stage: <Dropdown onChange={this.handleStageChange} inline options={this.state.stages} defaultValue={this.state.stage}/>
        </div>
        <TimelineGraph
          stage = {this.state.stage}
        />
      </div>
    )
  }
}

export default Analytics;

Analytics.propTypes = {
  // navBarIsHidden: PropTypes.bool
}

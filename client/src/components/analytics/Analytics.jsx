import React from 'react'
// import styles from './../../../styles/analyticsStyles.css'
import PropTypes from 'prop-types'
import TimelineGraph from './TimelineGraph.jsx'
import Dropdown from './Dropdown.jsx'

let Analytics = (props) => {
  return (
    <div>
      <div style={{height:"66px"}}></div>
      <div>Analytics about <Dropdown/> stage: </div>
      <TimelineGraph
        stage = {props.stage}
      />
    </div>
  )
}

export default Analytics;

Analytics.propTypes = {
  // navBarIsHidden: PropTypes.bool
}

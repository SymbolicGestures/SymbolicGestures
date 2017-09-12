import React from 'react'
// import styles from './../../../styles/timelineStyles.css'
import PropTypes from 'prop-types'
import C3Chart from 'react-c3js'

let SocialGraph = (props) => {
  return(
    <div>
      <C3Chart
        axis={{
            x: {
                type: 'timeseries',
                tick: {
                  format: '%m-%d-%Y'
                }
            },
            y: {
              tick: {
                format: function(x) { return x % 1 === 0 ? x : ''; }
              }
            }
        }}
        data={{
          x: 'x',
          columns: [
              ['x', ...props.dates],
              [`${props.stage} count:`, ...props.stageCounts],
          ],
          type: 'bar'
        }}

        zoom={{
          enabled: true
        }}
      />
      {props.stage}
    </div>
  )
}

export default SocialGraph;

SocialGraph.propTypes = {
  stage: PropTypes.string,
  dates: PropTypes.array,
  stageCounts: PropTypes.array
}

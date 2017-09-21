import React from 'react'
import styles from './../../../styles/socialGraphStyles.css'
import PropTypes from 'prop-types'
import C3Chart from 'react-c3js'

const SocialGraph = (props) => {
  let graphHeight = window.innerHeight - 180;
  return (
    <C3Chart
      size={{
        height: graphHeight
      }}
      padding={{
        left: 140
      }}
      color={{
        pattern: ['#0da17d']
      }}
      data={{
        json: props.socialGraphData,
        keys: {
          x: 'name',
          value: ['percentage']
        },
        type: 'bar',
        labels: {
          format: function (v, id, i, j) { return v + "%"; }
        }
      }}
      axis={{
        rotated: true,
        x: {
          type: 'categorized',
          //for column label
          // label: {
          //   text: '',
          //   position: 'outer-middle'
          // },
          tick: {
            multiline: false
          }
        },
        y: {
          show: false
        }
      }}
      grid={{
        x: {
          show: true
        }
      }}
      title={{
        text: `My Organization's Individual Highest Salary Offered`
      }}
      legend={{ hide: ['percentage'] }}
      tooltip={{
        format: {
          name: (name, ratio, id, index) => { return 'Count:'; },
          value: (value, ratio, id, index) => { return props.socialGraphData[index].count; }
        }
      }}
    />
  )
}

export default SocialGraph;

SocialGraph.propTypes = {
  socialGraphData: PropTypes.array
};

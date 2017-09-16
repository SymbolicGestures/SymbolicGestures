import React from 'react'
import styles from './../../../styles/socialGraphStyles.css'
import PropTypes from 'prop-types'
import C3Chart from 'react-c3js'

let SocialGraph = (props) => {
  return(
    <div>
      <div style={{'padding': "10px"}}></div>
      <div style={{"textAlign": "center"}}>Organization: HR80</div>
      <C3Chart
        // size={{
        //   width: 640
        // }}
        padding={{
          left: 200
        }}
        color={{
          pattern: ['#0da17d']
        }}
        data={{
          x: 'name',
          json: props.socialGraphData,
          x: ['name'],
          keys: {
            x: 'name',
            value: ['percentage']
          },
          type: 'bar',
          labels: {
              format: function (v, id, i, j) { return v+"%"; }
          }
        }}
        axis={{
          rotated: true,
          x: {
            type:'categorized',
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
          text: `Highest Salary Offered`
        }}
        legend={{hide: ['percentage']}}
        tooltip={{
          format: {
            name: function (name, ratio, id, index) { return 'Count:'; },
            value: function (value, ratio, id, index) { return props.socialGraphData[index].count; }
          }
        }}
      />
    </div>
  )
}

export default SocialGraph;

SocialGraph.propTypes = {
  socialGraphData: PropTypes.array
}

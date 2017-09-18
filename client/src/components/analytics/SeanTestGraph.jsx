import React, { Component } from 'react';

// import React from 'react';
// import ReactDOM from 'react-dom';
import C3Chart from 'react-c3js';
import 'c3';

import dataFromOtherFile from '../../../../testFakerPastDate.js'

const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ]
};

let type = 'bar';

const intMonthHash = {
  '01': { name: 'January', color: '#e0a048' },
  '02': { name: 'Feburary', color: '#cccccc' },
  '03': { name: 'March', color: '#c7594a' },
  '04': { name: 'April', color: '#d4a184' },
  '05': { name: 'May', color: '#d9695e' },
  '06': { name: 'June', color: '#1e7f6e' },
  '07': { name: 'July', color: '#63b166' },
  '08': { name: 'August', color: '#9dc8eb' },
  '09': { name: 'September', color: '#b6698b' },
  '10': { name: 'October', color: '#4d4d6f' },
  '11': { name: 'November', color: '#6d554b' },
  '12': { name: 'December', color: '#d82a41' },
};


// let exampleData = {[
//   {appliedDate: 'under $60K', dateAppliedCount: 2, dateAppliedCount: 20},
//   {appliedDate: '$60K to $69,999', dateAppliedCount: 1, dateAppliedCount: 35},
//   {appliedDate: '$70K to $79,999', dateAppliedCount: 3, dateAppliedCount: 40},
//   {appliedDate: 'over $80K', dateAppliedCount: 4, dateAppliedCount: 10}
// ]}

// let exampleData = [
//   { appliedDate: '09/11/17', dateAppliedCount: 2, },
//   { appliedDate: '09/12/17', dateAppliedCount: 1, },
// ];

// let exampleData = dataFromOtherFile;

export default class SeanTestGraph extends Component {
  constructor(props) {
    super(props);
    this.state={
      someState: '',
    };
  }

  render() {
    return (
      <div>
        {/* {console.log('this', this.props.fakeSeanGraphData)} */}
        <C3Chart
          padding={{ left: 100, right: 100 }}
          color={{ pattern: [intMonthHash[this.props.intMonth].color] }}
          data={{
            json: this.props.fakeSeanGraphData,
            keys: { x: 'appliedDate', value: ['howManyApplied'] },
            type: 'bar',
          }}
          zoom={{
            enabled: false
          }}
          axis={{
            x: {
              type: 'categorized',
              tick: {
                multiline: false,
                rotate: 75,
              }
            },
            y: {
              tick: {
                format: (y) => { return y % 1 === 0 ? y : ''; }
              }
            }
          }}
          grid={{ x: { show: true } }}
          title={{ text: `# of Job Applied per Day in ${intMonthHash[this.props.intMonth].name}` }}
          legend={{
            show: false
          }}
        />
      </div>
    );
  }
}



// {/* tooltip={{
//   format: {
//     appliedDate: (appliedDate, ratio, id, index) => { return 'dateAppliedCount:'; },
//     value: (value, ratio, id, index) => {  return props.exampleData[index].dateAppliedCount; }
//   }
// }} */}
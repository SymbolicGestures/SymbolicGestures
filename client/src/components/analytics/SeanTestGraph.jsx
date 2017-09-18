import React, { Component } from 'react';

// import React from 'react';
// import ReactDOM from 'react-dom';
import C3Chart from 'react-c3js';
import 'c3';

const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ]
};

let type = 'bar';


// let exampleData = {[
//   {appliedDate: 'under $60K', dateAppliedCount: 2, dateAppliedCount: 20},
//   {appliedDate: '$60K to $69,999', dateAppliedCount: 1, dateAppliedCount: 35},
//   {appliedDate: '$70K to $79,999', dateAppliedCount: 3, dateAppliedCount: 40},
//   {appliedDate: 'over $80K', dateAppliedCount: 4, dateAppliedCount: 10}
// ]}

let exampleData = [
  { appliedDate: '09/11/17', dateAppliedCount: 2, },
  { appliedDate: '09/12/17', dateAppliedCount: 1, },
  { appliedDate: '09/13/17', dateAppliedCount: 3, },
  { appliedDate: '09/14/17', dateAppliedCount: 4, },
  { appliedDate: '09/15/17', dateAppliedCount: 0, },
  { appliedDate: '09/16/17', dateAppliedCount: 1, },
  { appliedDate: '09/17/17', dateAppliedCount: 3, },
  { appliedDate: '09/18/17', dateAppliedCount: 4, },
  { appliedDate: '09/11/11', dateAppliedCount: 2, },
  { appliedDate: '09/12/12', dateAppliedCount: 1, },
  { appliedDate: '09/13/13', dateAppliedCount: 3, },
  { appliedDate: '09/14/14', dateAppliedCount: 4, },
  { appliedDate: '09/11/15', dateAppliedCount: 2, },
  { appliedDate: '09/12/16', dateAppliedCount: 1, },
  { appliedDate: '09/13/17', dateAppliedCount: 3, },
  { appliedDate: '09/14/18', dateAppliedCount: 4, },
  { appliedDate: '09/11/19', dateAppliedCount: 2, },
  { appliedDate: '09/12/20', dateAppliedCount: 1, },
];

export default class componentappliedDate extends Component {
  constructor(props) {
    super(props);
    this.state={
      someState: '',
    };
  }

  render() {
    return (
      <div>
        <C3Chart
          padding={{ left: 200 }}
          color={{ pattern: ['#41648a'] }}
          data={{
            json: exampleData,
            keys: { x: 'appliedDate', value: ['dateAppliedCount'] },
            type: 'bar',
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
          title={{ text: '# of Job Applied per Day' }}
          legend={{ hide: ['dateAppliedCount'] }}
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
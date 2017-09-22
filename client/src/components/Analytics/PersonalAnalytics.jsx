import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3';

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

const roundNumber = (num, scale) => {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

export default class SeanTestGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: '',
    };
  }

  render() {
    return (
      <div>
        <C3Chart
          padding={{ left: 100, right: 100 }}
          color={{ pattern: [intMonthHash[this.props.intMonth].color] }}
          data={{
            json: this.props.dateAppliedGraphData,
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

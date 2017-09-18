import React from 'react'
import PropTypes from 'prop-types'
import SocialGraph from './SocialGraph.jsx'
import axios from 'axios'

import SeanTestGraph from './SeanTestGraph.jsx';

class Analytics extends React.Component {
  constructor() {
    super();
    this.state={
      socialGraphData: []
    };
    this.salaryIncrements = 10000;
    this.salaryStartPoint = 60000;
    this.salaryCeiling = 200000;
    this.getOrgSalaries = this.getOrgSalaries.bind(this);
  }

  componentWillMount() {
    this.getOrgSalaries()
  }

  getOrgSalaries() {
    axios.get('api/orgSalary')
      .then(salaries => {
        let socialGraphData = [{name: `under $${this.numberWithCommas(Math.round(this.salaryStartPoint/1000))}k`, count: 0, percentage: undefined}];
        let graphStartingPoint = this.salaryIncrements;
        salaries.data.forEach((salary)=>{
          if(salary < this.salaryStartPoint) {
            socialGraphData[socialGraphData.length - 1].count++;
          } else {
            while(salary >= this.salaryStartPoint && salary <= this.salaryCeiling) {
              this.salaryStartPoint += this.salaryIncrements;
              if(salary >= this.salaryStartPoint) {
                socialGraphData.push({
                  name: `$${this.numberWithCommas(this.salaryStartPoint - 10000)} to ${this.numberWithCommas(this.salaryStartPoint - 1)}`,
                  count: 0,
                  percentage: undefined
                });
              } else {
                socialGraphData.push({
                  name: `$${this.numberWithCommas(this.salaryStartPoint - 10000)} to ${this.numberWithCommas(this.salaryStartPoint - 1)}`,
                  count: 1,
                  percentage: undefined
                });
              }
            }
            if(salary <= this.salaryCeiling) {

            }
          }
        });
        socialGraphData.map(data => {
          data.percentage = Math.floor(data.count/salaries.data.length*100)
          return data;
        });
        this.setState({
          socialGraphData: socialGraphData
        });
      });
  }

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let socialGraph = null;
    if (this.state.socialGraphData.length > 0) {
      socialGraph = (
        <SocialGraph
          socialGraphData={this.state.socialGraphData}
          organization={this.state.organization}
        />
      );
    } else {
      socialGraph = (<div></div>)
    }
    return (
      <div>
        <div style={{height:"66px"}}></div>
        {socialGraph}
        <SeanTestGraph />
      </div>
    );
  }
}

export default Analytics;

Analytics.propTypes = {
}

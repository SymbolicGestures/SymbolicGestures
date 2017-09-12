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
      stage: 'OFFER',
      stages: [],
      dates: [],
      stageCounts: []
    };
    this.handleStageChange = this.handleStageChange.bind(this);
  }
  componentWillMount() {
    this.getAllStages()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.stage !== this.state.stage) {
      this.getAllStages();
    }
  }

  getAllStages() {
    axios.get('/api/profiles')
      .then((profile) => {
        let stagesData = profile.data.stages_settings.map((item) => {
          return {
            text: item.name,
            value: item.name
          }
        })
        axios.get('/api/historyAnalytics')
          .then((analysis) => {
            let datesSortedByCreation = (analysis.data.sort((a,b)=>{return new Date(a['created_at'])-new Date(b['created_at'])}));
            let daysToToday = [];
            let day = parse(datesSortedByCreation[0]['created_at']);
            while(!isToday(subDays(day, 1))) {
              daysToToday.push(format(day, 'YYYY-MM-DD'));
              day = addDays(day, 1)
            }
            let stageArr = daysToToday.map(day => {

            });
          //   analysis.data.forEach(stage => {
          //     //need to refactor with date parser instead of slice
          //     if (stage.history_stage === this.state.stage) {
          //       let date = stage.updated_at.slice(0, 10);
          //       dateWithHistory[date] ? dateWithHistory[date]++ : dateWithHistory[date] = 1;
          //     }
          //   })
          //   console.log(dateWithHistory)
          //   let dateArray = [];
          //   let stageCountArray = Object.keys(dateWithHistory).map((key) => {
          //     dateArray.push(key)
          //     return dateWithHistory[key];
          //   })
          //   this.setState({
          //     stages: stagesData,
          //     stage: this.state.stage || stagesData[stagesData.length - 1]['value'],
          //     dates: dateArray,
          //     stageCounts: stageCountArray
          //   })
          })
      })
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
        <SocialGraph
          stage = {this.state.stage}
          dates = {this.state.dates}
          stageCounts = {this.state.stageCounts}
        />
      </div>
    )
  }
}

export default Analytics;

Analytics.propTypes = {
  // navBarIsHidden: PropTypes.bool
}

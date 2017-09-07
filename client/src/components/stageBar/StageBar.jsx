import React from 'react';
import StageBarList from './StageBarList.jsx';

import styles from '../../../styles/stageBar.css';

class StageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stagesCount: {}
    }

    //*******Function Bindings**********//
    this.countApplicationStages = this.countApplicationStages.bind(this);
  }

  componentWillReceiveProps() {
    this.countApplicationStages();
  }

  /**
   * Counts how many applications each stage has for
   * dynamic rendering of stage length.
   * @todo: Set both count and size of flex-grow
   */
  countApplicationStages() {
    let applications = this.props.applications,
        stages = this.props.stages,
        count = {};
    console.log('Counting: ', applications);
    // Count number of each stage.
    for (let i = 0; i < applications.length; i++) {
      let stage = applications[i].stage;
      if(count[stage] && count[stage] < 6) {
        count[stage]++;
      } else {
        count[stage] = 1;
      }
    }
    // Set count state after counting.
    this.setState({
      stagesCount: count
    });
  }

  render() {
    return (
      <div className={styles.stageBar}>
        <StageBarList
          stages={this.props.stages}
          stagesCount={this.props.stagesCount}
        />
      </div>
    )
  }
}


export default StageBar;

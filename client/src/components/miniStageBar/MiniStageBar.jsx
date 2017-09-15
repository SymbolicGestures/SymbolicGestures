import React from 'react';
import MiniStageBarList from './MiniStageBarList.jsx';
import styles from '../../../styles/miniStageBar.css';

class MiniStageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStage: {'stage': {
                      'name': undefined,
                      'backgroundColor': '#2196F3',
                      'textColor': '#000'},
                    'index': 0},
    }

    //*******Function Bindings**********//

  }

  render() {
    return (
      <div className={styles.miniStageBarContainer}>
        <MiniStageBarList
          stages={this.props.stages}
          stage={this.props.stage}
          selectedAppIdx={this.props.selectedAppIdx}
          updateOneAppStage={this.props.updateOneAppStage}
          />
      </div>
    );
  };
}


export default MiniStageBar;

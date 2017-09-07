import React from 'react';
import StageBarEntry from './StageBarEntry.jsx';
import styles from '../../../styles/stageBar.css';

const StageBarList = (props) => {


  return (
    <div className={styles.stageBar}>
      <ul className={styles.arrows}>
        {props.stages.map((stage, key) => {
          stage['count'] = props.stagesCount[stage.name] || 1;
          return <StageBarEntry
                  stage={stage}
                  key={key}
                  entryPosition={key}
                />;
        })}
        <li className={styles.addStage} onClick={props.onClickAddStage}>
          Add Stage
        </li>
      </ul>
    </div>
  );
};
export default StageBarList;

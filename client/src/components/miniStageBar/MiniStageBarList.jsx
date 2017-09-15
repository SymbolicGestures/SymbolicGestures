import React from 'react';
import MiniStageBarEntry from './MiniStageBarEntry.jsx';
import styles from '../../../styles/miniStageBar.css';

const MiniStageBarList = (props) => {
  /******Used for dynamic conditional rendering***********/
  let currentStageFound = false;
  return (
    <div className={styles.miniStageBar}>
      <ul>
        {

          props.stages.map((stage, key) => {
          let bgColor = stage.backgroundColor,
              textColor = stage.textColor,
              opacity = 1,
              addOnHover;
          if (props.stage === stage.name) {
            currentStageFound = true;
          } else if (currentStageFound) {
            opacity = .2;
            addOnHover = true;
          }
          return <MiniStageBarEntry
                  stage={stage}
                  bgColor={bgColor}
                  textColor={textColor}
                  opacity={opacity}
                  addOnHover={addOnHover}
                  key={key}
                  selectedAppIdx={props.selectedAppIdx}
                  updateOneAppStage={props.updateOneAppStage}
                />;
        })}
      </ul>
    </div>
  );
};
export default MiniStageBarList;

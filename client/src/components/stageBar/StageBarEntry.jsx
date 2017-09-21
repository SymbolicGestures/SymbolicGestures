import React from 'react';
import { Icon } from 'semantic-ui-react'
import styles from '../../../styles/stageBar.css';

const StageBarEntry = (props) => {
  let style = {
    'position': 'relative',
    'color': props.stage.textColor,
    'background': props.stage.backgroundColor,
    'flex': `${props.flexSize}`,
    'opacity': props.opacity,
  };
  if (props.stage.name === 'Denied') {
    style.flex = 1;
  }

  return (
    <li
      style={style}
      onClick={() => { props.toggleStage(props.entryPosition) }}
    >
      <div className={styles.settings}>

      </div>
      {props.count}<br />{props.stage.name}
    </li>
  );
};
export default StageBarEntry;

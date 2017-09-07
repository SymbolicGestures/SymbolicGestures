import React from 'react';
import { Icon } from 'semantic-ui-react'
import styles from '../../../styles/stageBar.css';

const StageBarEntry = (props) => {
  let style = {
    'position': 'relative',
    'color': props.stage.textColor,
    'background': props.stage.backgroundColor,
    'flex': `${props.stage.count}`
  };
  return (
    <li style={style}
      onClick={props.handleOnClick}
      onChange={console.log('change')}
    >
      <div className={styles.settings}>
        <Icon link name='setting' onClick={()=>{console.log('HelloSettings')}}/>
      </div>
      {props.stage.count}<br/>{props.stage.name}
    </li>
  );
};
export default StageBarEntry;

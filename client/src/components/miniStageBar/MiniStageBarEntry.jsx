import React from 'react';
import styles from '../../../styles/miniStageBar.css';

const MiniStageBarEntry = (props) => {
  let style = {
    'color': props.textColor,
    'background': props.bgColor,
    'paddingTop': '7px',
    'opacity': props.opacity
  };

  let onHoverOpacity = function(el) {
    el.target.style.opacity = 1;
  }

  let outHoverOpacity = function(el) {
    el.target.style.opacity = .2;
  }

  if (props.addOnHover) {
    return (
      <li
        style={style}
        onMouseOver={onHoverOpacity}
        onMouseOut={outHoverOpacity}
        onClick={() => {props.updateOneAppStage(props.selectedAppIdx, props.stage.name)}}
      >
        {props.stage.name}
      </li>
    );
  } else {

    return (
      <li
        style={style}
        onClick={() => {props.updateOneAppStage(props.selectedAppIdx, props.stage.name)}}
      >
        {props.stage.name}
      </li>
    );
  }
};
export default MiniStageBarEntry;

import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ColorPicker from 'material-ui-color-picker'
import TextField from 'material-ui/TextField';

import styles from '../../../styles/stageBar.css';

const StageBarSettings = (props) => {
  const actions = [
    <FlatButton
      label="Delete"
      style={{ 'float': 'left', 'color': 'red' }}
      primary={true}
      keyboardFocused={true}
      onClick={props.deleteStage}
    />,
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={props.cancelStage}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onClick={props.submitStage}
    />,

  ];

  return (
    <div>
      <MuiThemeProvider>
        <Dialog
          title="Edit Stage"
          actions={actions}
          modal={false}
          open={props.open}
          onRequestClose={props.cancelStage}
        >
          <TextField
            id="Name"
            value={props.activeStage.stage.name}
            onChange={props.handleNameChange}
            floatingLabelText="Name"
          />
          <div className={styles.settingsColorPickers}>
            <ColorPicker
              defaultValue={props.activeStage.stage.backgroundColor}
              onChange={props.handleBackgroundColorChange}
              floatingLabelText="Background Color"
            />

            <ColorPicker
              defaultValue={props.activeStage.stage.textColor}
              onChange={props.handleTextColorChange}
              floatingLabelText="Text Color"
            />
          </div>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
};

export default StageBarSettings;

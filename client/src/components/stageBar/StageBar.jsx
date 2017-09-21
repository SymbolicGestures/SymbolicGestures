import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import StageBarList from './StageBarList.jsx';
import StageBarSettings from './StageBarSettings.jsx';
import styles from '../../../styles/stageBar.css';


class StageBar extends React.Component {
  constructor(props) {
    super(props);

    /** ***State Descriptions***
     * stagesCount - Counts all the applications and stores {stage : count}
     * settingsOpen - Boolean for if stage popup is showing
     * activeStage - Stage that is displayed inside settings popup
     * activeStageBackup - Stage used to reset values on cancel settings
     */
    this.state = {
      stagesCount: {},
      settingsOpen: false,
      activeStage: {
        'stage': {
          'name': undefined,
          'backgroundColor': '#2196F3',
          'textColor': '#000'
        },
        'index': 0
      },
      activeStageBackup: {
        'stage': {
          'name': undefined,
          'backgroundColor': '#2196F3',
          'textColor': '#000'
        },
        'index': 0
      },
    }

    //*******Function Bindings**********//
    this.handleOpen = this.handleOpen.bind(this);
    this.addNewStage = this.addNewStage.bind(this);
    this.deleteStage = this.deleteStage.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
    this.handleTextColorChange = this.handleTextColorChange.bind(this);
    this.stageSettingsSubmit = this.stageSettingsSubmit.bind(this);
    this.stageSettingsCancel = this.stageSettingsCancel.bind(this);
  }

  /**
   * Adds new stage and updates database.
   * @todo: add random color generator
   */
  addNewStage() {
    let currentStages = this.props.stages,
      newStage = [{
        backgroundColor: "#FFC107",
        name: "Applied",
        textColor: "black"
      }];

    this.props.onStagesChange(currentStages.concat(newStage));
  }

  /**
   * Deletes a stage and pushes to the database
   */
  deleteStage() {
    let currentStages = this.props.stages,
      index = this.state.activeStage.index;

    currentStages.splice(index, 1);
    this.props.onStagesChange(currentStages);
    this.setState({ settingsOpen: false });
  }

  /**
   * Changes state of stages name.
   * @param  {object} event onChange event
   */
  handleNameChange(event) {
    let currentStages = this.props.stages,
      activeStage = this.state.activeStage,
      index = this.state.activeStage.index;

    activeStage.stage.name = event.target.value;

    this.setState({ activeStage: activeStage });
  }

  /**
   * Changes state of stages background-color.
   * @param  {object} event onChange event
   */
  handleBackgroundColorChange(event) {
    let currentStages = this.props.stages,
      activeStage = this.state.activeStage,
      index = this.state.activeStage.index;

    activeStage.stage.backgroundColor = event;

    this.setState({ activeStage: activeStage });
  }

  /**
   * Changes state of stages text color.
   * @param  {object} event onChange event
   */
  handleTextColorChange(event) {
    let currentStages = this.props.stages,
      activeStage = this.state.activeStage,
      index = this.state.activeStage.index;

    activeStage.stage.textColor = event;

    this.setState({ activeStage: activeStage });
  }

  /**
   * On submit it sends changed Stages and Applications data to database and resets state
   */
  stageSettingsSubmit() {
    let index = this.state.activeStage.index,
      currentStages = _.cloneDeep(this.props.stages),
      applications = _.cloneDeep(this.props.applications),
      newStageName = this.state.activeStage.stage.name,
      initialStageName = this.state.activeStageBackup.stage.name;

    currentStages[index] = this.state.activeStage.stage;

    // iterate through applications and replace stage name with replacement.
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].stage === initialStageName) {
        // applications[i].stage = newStageName;
        this.props.updateOneAppStage(i, newStageName);
      };
    }
    this.props.onStagesChange(currentStages);
    this.setState({ settingsOpen: false });
  }

  /**
   * On cancel/click-out reset changes to previous state.
   */
  stageSettingsCancel() {
    let index = this.state.activeStage.index,
      currentStages = this.props.stages;
    currentStages[index] = this.state.activeStageBackup.stage;

    this.setState({ activeStage: this.state.activeStageBackup });
    this.setState({ settingsOpen: false });
  }

  /**
   * Opens a stages settings. Sets the state of activeStage to index.
   * Sets a copy of the stage to activeStageBackup for cancel option.
   * @param  {integer} index index of selected stage.
   */
  handleOpen(index) {
    let currentStages = this.props.stages,
      copyStages = _.cloneDeep(currentStages);
    this.setState({
      activeStage: {
        'stage': currentStages[index],
        'index': index
      },
      activeStageBackup: {
        'stage': copyStages[index],
        'index': index
      },
      settingsOpen: true
    });
  }


  render() {
    return (
      <div className={styles.stageBar}>
        <StageBarList
          stages={this.props.stages}
          stagesCount={this.props.stagesCount}
          addNewStage={this.addNewStage}
          openSettings={this.handleOpen}
          toggleStage={this.props.toggleStage}
          stages_filter={this.props.stages_filter}
        />
        <StageBarSettings
          open={this.state.settingsOpen}
          activeStage={this.state.activeStage}
          handleNameChange={this.handleNameChange}
          handleBackgroundColorChange={this.handleBackgroundColorChange}
          handleTextColorChange={this.handleTextColorChange}
          submitStage={this.stageSettingsSubmit}
          cancelStage={this.stageSettingsCancel}
          deleteStage={this.deleteStage}
        />
      </div>
    );
  };
}


export default StageBar;

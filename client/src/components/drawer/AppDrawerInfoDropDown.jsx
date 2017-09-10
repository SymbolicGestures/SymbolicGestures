import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

let fakestages_settings = [
  { name: 'Applied', backgroundColor: '#FFC107', textColor: 'black' },
  { name: 'Phone Screen', backgroundColor: '#2196F3', textColor: 'white' },
  { name: 'OFFER', backgroundColor: '#009688', textColor: 'white' },
  { name: 'Denied', backgroundColor: '#F44336', textColor: 'white' },
  { name: 'On Site', backgroundColor: '#F24326', textColor: 'white' }
];
let fakeStageNameToColorHash = {};
fakestages_settings.forEach((setting) => {
  fakeStageNameToColorHash[setting.name] = {
    backgroundColor: setting.backgroundColor,
    color: setting.textColor,
  };
});


// stages_settings
// stageNameToColorHash
// application.stage


class AppDrawerInfoDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownText: 'Applied'
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateOneStageToDB = this.updateOneStageToDB.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.stage !== undefined) {
      this.setState({
        dropDownText: nextProps.stage
      });
    }
    // console.log('nextProps:', nextProps)
    // this.setState({
    //   dropDownText
    // });
  }

  handleClick(clickedText) {
    this.props.updateOneAppStage(this.props.selectAppIdx, clickedText);
    this.setState({ dropDownText: clickedText });
    this.updateOneStageToDB(clickedText)
  }

  updateOneStageToDB(clickedText) {
    // console.log('application:', this.props.application);
    let route = '/api/applications/' + this.props.application.id;
    let key = 'stage';
    let val = clickedText;
    let body = {};
    body[key] = val;

    axios.post(route, body)
      .then(console.log('post stage succed'))
      .then((err) => { console.log(err); });
      // .then(this.props.getApplicationsFromDB())
  }

  render() {
    // stages_settings={this.props.stages_settings}
    // stageNameToColorHash={this.props.stageNameToColorHash}
    // console.log(this.props.stageNameToColorHash);
    // console.log(this.props.stages_settings);
    
    // if (this.props.stageNameToColorHash !== undefined) {
    //   if (this.props.stages_settings !== undefined) {

    return (<div>
      <Dropdown
        text={this.state.dropDownText}
        onChange={this.handleChange}
        style={this.props.stageNameToColorHash[this.state.dropDownText]}
        floating
        button
      >
        <Dropdown.Menu>
          {this.props.stages_settings.map((dropDownItem, idx) => {
            return (
              <Dropdown.Item
                onClick={() => { this.handleClick(dropDownItem.name); }}
                style={this.props.stageNameToColorHash[dropDownItem.name]}
                key={idx}
              >
                {dropDownItem.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>);


    //   }
    // }

    // return (<div></div>);

  }
}


export default AppDrawerInfoDropDown;

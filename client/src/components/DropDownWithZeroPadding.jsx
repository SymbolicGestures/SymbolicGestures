import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

class DropDownWithZeroPadding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownText: this.props.stage
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateOneStageToDB = this.updateOneStageToDB.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.stage) {
      // console.log(nextProps.stage)
      this.setState({
        dropDownText: nextProps.stage
      });
    }
  }

  handleClick(clickedText) {
    console.log('clickText:', clickedText);

    let eventText = "Stage was changed to " + clickedText;
    let route = '/api/histories/';
    let application_id = this.props.application.id
    let body = { 'event' : eventText, 'application_id' : application_id};
    axios.post(route, body)

    this.props.updateOneAppStage(this.props.selectedAppIdx, clickedText);
    this.setState({ dropDownText: clickedText });
    this.updateOneStageToDB(clickedText);
    this.props.getApplicationsFromDB();
  }

  handleChange(clickedText) {

    console.log('Am I capturing this ???');

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
  }

  render() {
    // let padding0 = { padding: 0 };
    let divStyle = { width: '100%', height: '100%', textAlign: 'center', fontSize: '15px' };
    return (<div>
      {/* <Dropdown
        text={this.state.dropDownText}
        style={Object.assign(divStyle, this.props.stageNameToColorHash[this.state.dropDownText])}
        floating
        button
      > */}
      <Dropdown
        text={this.state.dropDownText}
        style={Object.assign(divStyle, this.props.stageNameToColorHash[this.state.dropDownText])}
        floating
        button
      >
        <Dropdown.Menu>
          {this.props.stages_settings.map((dropDownItem, idx) => {
            return (
              <Dropdown.Item
                onChange={this.handleChange}
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
  }
}


export default DropDownWithZeroPadding;

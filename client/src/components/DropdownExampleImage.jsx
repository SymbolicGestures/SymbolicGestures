import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
// import { friendOptions } from '../common'

// let fakestages_settings = [
//   { name: 'Applied', backgroundColor: '#FFC107', textColor: 'black' },
//   { name: 'Phone Screen', backgroundColor: '#2196F3', textColor: 'white' },
//   { name: 'OFFER', backgroundColor: '#009688', textColor: 'white' },
//   { name: 'Denied', backgroundColor: '#F44336', textColor: 'white' },
//   { name: 'On Site', backgroundColor: '#F44336', textColor: 'white' }
// ];
// let fakeStageNameToColorHash = {};
// fakestages_settings.forEach((setting) => {
//   fakeStageNameToColorHash[setting.name] = {
//     backgroundColor: setting.backgroundColor,
//     color: setting.textColor,
//     width: '100%',
//     margin: 0,
//     padding: 0
//   };
// });

let padding0 = { padding: 0 };


class DropdownExampleImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownText: this.props.stage
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedText, applicationIdx) {
    console.log(clickedText);
    this.setState({ dropDownText: clickedText });
    this.props.updateOneAppStage(applicationIdx, clickedText);

    let route = '/api/applications/' + this.props.application.id;
    let key = 'stage';
    let val = clickedText;
    let body = {};
    body[key] = val;
    axios.post(route, body)
      .then(this.props.getApplicationsFromDB())
      .then((message) => { console.log(message); });
    this.props.getApplicationsFromDB();
  }


  render() {
    let stageNameToColorHash = this.props.stageNameToColorHash;
    return (<div>
      <Dropdown
        text={this.state.dropDownText}
        onChange={this.handleChange}
        style={Object.assign(padding0, stageNameToColorHash[this.state.dropDownText])}
        floating
        button
      >
        <Dropdown.Menu>
          {this.props.stages_settings.map((dropDownItem, idx) => {
            return (
              <Dropdown.Item
                onClick={() => { this.handleClick(dropDownItem.name, this.props.applicationIdx); }}
                style={Object.assign(stageNameToColorHash[dropDownItem.name])}
                key={idx}
              > {dropDownItem.name} </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>);
  }
}

export default DropdownExampleImage;

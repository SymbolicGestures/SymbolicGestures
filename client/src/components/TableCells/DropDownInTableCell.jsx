import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

class DropDownInTableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownText: this.props.stage,
      isDarkStyle: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateOneStageToDB = this.updateOneStageToDB.bind(this);
    this.ColorLuminance = this.ColorLuminance.bind(this);
    this.toggleDarkStyle = this.toggleDarkStyle.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.stage) {
      this.setState({
        dropDownText: nextProps.stage
      });
    }
  }

  handleClick(clickedText) {

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

  updateOneStageToDB(clickedText) {
    let route = '/api/applications/' + this.props.application.id;
    let key = 'stage';
    let val = clickedText;
    let body = {};
    body[key] = val;

    axios.post(route, body)
      .then(console.log('post stage succed'))
      .then((err) => { console.log(err); });
  }

  ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }

    return rgb;
  }

  toggleDarkStyle() {
    this.setState({ isDarkStyle: !this.state.isDarkStyle });
  }

  render() {
    // let padding0 = { padding: 0 };
    let divStyle = { width: '100%', height: '100%', textAlign: 'center', fontSize: '15px' };
    let dropDMenuStyle = { width: '100%', height: '100%', textAlign: 'center', fontSize: '15px' };
    
    
    return (<div>
      <Dropdown
        text={this.state.dropDownText}
        style={Object.assign(divStyle, this.props.stageNameToColorHash[this.state.dropDownText])}
        floating
        button
      >
        <Dropdown.Menu style={{ left: '5%', top: '82%' }}>
          {this.props.stages_settings.map((dropDownItem, idx) => {
            let dropDItemStyle = {};
            if (idx === this.props.stages_settings.length - 1) {
              dropDItemStyle = {
                border: '2.5px solid black',
              };
            } else {
              dropDItemStyle = {
                borderTop: '2.5px solid black',
                borderRight: '2.5px solid black',
                borderLeft: '2.5px solid black',
              };
            }
            let ddItemCombineStyle = Object.assign(dropDItemStyle, this.props.stageNameToColorHash[dropDownItem.name]);
            ddItemCombineStyle.backgroundColor = this.ColorLuminance(ddItemCombineStyle.backgroundColor, -0.1);

            return (
              <Dropdown.Item
                onMouseEnter={this.toggleDarkStyle}
                onClick={() => { this.handleClick(dropDownItem.name); }}
                style={ddItemCombineStyle}
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

export default DropDownInTableCell;

// Parent: DrawerAndApplicationTable.jsx
DropDownInTableCell.propTypes = {
  getApplicationsFromDB: PropTypes.func,
  application: PropTypes.object,
  stageNameToColorHash: PropTypes.object,
  stage: PropTypes.string,
  updateOneAppStage: PropTypes.func,
  selectedAppIdx: PropTypes.number,
  stages_settings: PropTypes.array,
};

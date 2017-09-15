import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

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
  }

  handleClick(clickedText) {

    // console.log('clickText:', clickedText);

    let eventText = "Stage was changed to " + clickedText;
    let route = '/api/histories/';
    let application_id = this.props.application.id
    let body = {'event' : eventText, 'application_id' : application_id};
    axios.post(route, body)

    this.props.updateOneAppStage( this.props.selectAppIdx, clickedText);
    this.setState({ dropDownText: clickedText });
    this.updateOneStageToDB(clickedText);
    this.props.getApplicationsFromDB();
  }

  updateOneStageToDB(clickedText) {
    // console.log('application:', this.props.application);
    let route = '/api/applications/' + this.props.application.id;
    let key = 'stage';
    let val = clickedText;
    let body = {};
    body[key] = val;

    axios.post(route, body)
      // .then(console.log('post stage succed'))
      .then((err) => { console.log(err); });
    // .then(this.props.getApplicationsFromDB())
  }

  render() {
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

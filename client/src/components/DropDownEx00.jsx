import React from 'react';
import { Dropdown } from 'semantic-ui-react';


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

class DropDownEx00 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownText: 'Applied'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedText) {
    this.setState({ dropDownText: clickedText });
  }

  render() {
    return (<div>
      <Dropdown
        text={this.state.dropDownText}
        onChange={this.handleChange}
        style={fakeStageNameToColorHash[this.state.dropDownText]}
        floating
        button
      >
        <Dropdown.Menu>
          {fakestages_settings.map((dropDownItem, idx) => {
            return (
              <Dropdown.Item
                onClick={() => { this.handleClick(dropDownItem.name); }}
                style={fakeStageNameToColorHash[dropDownItem.name]}
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


export default DropDownEx00;

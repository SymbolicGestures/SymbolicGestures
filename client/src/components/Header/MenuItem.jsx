import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AutoComplete from 'material-ui/AutoComplete'
import MaterialMenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'
import axios from 'axios'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class ProfilePreference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: []
    }
  };
  updateProfile() {
    axios('/api/organization')
      .then(profile => {

      })
  }
  render() {
    const actions = [
      <FlatButton
        label="Update Profile"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.onHide}
      />,
    ];
    const dataSource1 = [
      {
        text: 'text-value1',
        value: (
          <MaterialMenuItem
            primaryText="text-value1"
            secondaryText="&#9786;"
          />
        ),
      },
      {
        text: 'text-value2',
        value: (
          <MaterialMenuItem
            primaryText="text-value2"
            secondaryText="&#9786;"
          />
        ),
      },
    ];
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            title="Profile Preferences"
            actions={actions}
            modal={false}
            open={this.props.show}
            onRequestClose={this.props.onHide}
          >
            <AutoComplete
              hintText="Join an Organization"
              filter={AutoComplete.noFilter}
              dataSource={dataSource1}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

ProfilePreference.propTypes = {
  navBarIsHidden: PropTypes.bool,
  profileImg: PropTypes.string,
  displayName: PropTypes.string
}

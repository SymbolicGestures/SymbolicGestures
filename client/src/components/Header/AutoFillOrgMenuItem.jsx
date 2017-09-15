import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AutoComplete from 'material-ui/AutoComplete'
import MaterialMenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'
import axios from 'axios'
import TextField from 'material-ui/TextField';

export default class AutoFillOrgMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      organization: '',
      organizationId: undefined,
      isSelectedFromList: undefined
    }
    this.getOrganizations = this.getOrganizations.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.profile.organizations && !this.state.organizationId) {
      this.setState({organization: nextProps.profile.organizations.organization_name, organizationId: nextProps.profile.organizations.id})
    }
  }
  updateProfile(orgId, orgName) {
    axios.post('/api/profiles', {
      "organization_id": orgId
    }).then(()=>{
      this.setState({organization: orgName, organizationId: orgId});
      this.props.onHide()
    });
    axios.post(`/fuzzy/organizations/${orgId}`, {
      "member_count": 1
    });
  }
  addOrganizationAndUpdateProfile(orgName) {
    axios.post(`/fuzzy/organizations`, {
      organization_name: orgName
    })
    .then(organization => {
      axios.post(`/api/profiles`, {
        organization_id: organization.data.id
      })
      this.setState({organization: orgName});
      this.props.onHide();
    })
  }
  getOrganizations(fuzzySearchTerm, limit) {
    axios.post('/fuzzy/fuzzyMatchOrganizations', {
      organization_name: fuzzySearchTerm,
      limit: limit
    })
      .then(organizations => {
        let dataSource = [];
        organizations.data.rows.forEach((org, i) => {
          let data = {
            text: org.organization_name,
            value: (
              <MaterialMenuItem
                primaryText={org.organization_name}
                secondaryText="&#43;"
              />
            ),
            index: org.id
          }
          dataSource.push(data)
        });
        this.setState({
          organizations : dataSource,
        })
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Dialog
            title="Profile Preferences"
            actions={[
              <FlatButton
                label="Update Profile"
                primary={true}
                keyboardFocused={true}
                onClick={()=>{
                  if(this.state.isSelectedFromList) {
                    this.updateProfile(this.state.organizationId, this.state.organization);
                  } else {
                    this.addOrganizationAndUpdateProfile(this.state.organization);
                  }
                }}
              />
            ]}
            modal={false}
            open={this.props.show}
            onRequestClose={this.props.onHide}
          >
            Organization: <AutoComplete
              hintText="Join an Organization"
              dataSource={this.state.organizations}
              floatingLabelText={this.state.organization.length ? this.state.organization : 'Join an Organization'}
              maxSearchResults={10}
              onNewRequest={(value, i)=>{
                let isSelectedFromList = i >= 0 ? true : false;
                if(isSelectedFromList) {
                  this.setState({organization: value.text, organizationId: value.index, isSelectedFromList: isSelectedFromList})
                } else {
                  this.setState({organization: this.state.organization, isSelectedFromList: isSelectedFromList})
                }
              }}
              onUpdateInput={(search)=>{
                this.getOrganizations(search, 10);
                this.setState({organization: search});
              }}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

AutoFillOrgMenuItem.propTypes = {
  navBarIsHidden: PropTypes.bool,
  profileImg: PropTypes.string,
  displayName: PropTypes.string
}

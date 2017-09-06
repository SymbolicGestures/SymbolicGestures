import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment, Button, Icon } from 'semantic-ui-react';

import MateUiRightDrawer from './MateUiRightDrawer.jsx';

export default class DrawerAndApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedApplication: this.props.applications[0] || [],
      isDrawerOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleClick(application) {
    // console.log(application);
    this.setState({ selectedApplication: application });
  }

  handleAddButtonClick() {
    console.log('yeah');
    this.props.handleAddButtonClick();
    // this.setState({ isDrawerOpen: true });
  }

  closeDrawer() {
    console.log('ddd');
  }

  render() {
    const segmentStyle = { padding: 0 };
    const applications = this.props.applications || [];
    const stageNameToColorHash = this.props.stageNameToColorHash || {};
    return (<div onClick={this.closeDrawer} >

      <Button color="vk" onClick={this.handleAddButtonClick}>
        <Icon name="plus" /> Add Aplication
      </Button>

      <MuiThemeProvider>
        <MateUiRightDrawer
          application={this.state.selectedApplication}
          isDrawerOpen={this.state.isDrawerOpen}
          handleAddButtonClick={this.handleAddButtonClick}
        />
      </MuiThemeProvider>
      <Segment style={segmentStyle}>

        <Table singleLine selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Applied</Table.HeaderCell>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Stage</Table.HeaderCell>
              <Table.HeaderCell>Link</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {applications.map((application, idx) => {
              return (
                <Table.Row key={idx} onClick={() => (this.handleClick(application))}>
                  <Table.Cell>{application.createdAt}</Table.Cell>
                  <Table.Cell>{application.companyName}</Table.Cell>
                  <Table.Cell>{application.jobTitle}</Table.Cell>
                  <Table.Cell
                    style={stageNameToColorHash[application.stage]}
                  >{application.stage}</Table.Cell>
                  <Table.Cell>{application.jobPostingLink}</Table.Cell>
                  <Table.Cell>{application.jobPostingSource}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

      </Segment>
    </div>
    );
  }
}

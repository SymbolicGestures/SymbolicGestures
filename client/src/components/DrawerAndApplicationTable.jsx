import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment, Button, Icon } from 'semantic-ui-react';

import Drawer from './Drawer.jsx';

export default class DrawerAndApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedApplication: this.props.applications[0] || [],
      showDrawer: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  handleClick(application) {
    // console.log(application);
    this.setState({ selectedApplication: application });
  }

  showDrawer() {
    console.log('yeah');
    this.setState({ showDrawer: true });
  }

  render() {
    const segmentStyle = { padding: 0 };
    const applications = this.props.applications || [];
    const stageNameToColorHash = this.props.stageNameToColorHash || {};
    return (<div>
      {console.log('in application table', applications)}
      <Button
        color="vk"
        content="Add Aplication"
        icon="add square"
        labelPosition="left"
        onClick={this.showDrawer}
      /><Button>
        <Icon name="plus" /> Add Aplication
      </Button>

      <Button positive>
        <Icon name="plus" /> Add Aplication
      </Button>

      <Button color="vk">
        <Icon name="plus" /> Add Aplication
      </Button>
      <Button content="Next" icon="right arrow" labelPosition="right" />

      <MuiThemeProvider>
        <Drawer
          application={this.state.selectedApplication}
          showDrawer={this.state.showDrawer}
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

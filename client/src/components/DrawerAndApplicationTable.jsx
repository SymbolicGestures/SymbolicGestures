import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment } from 'semantic-ui-react';

import Drawer from './Drawer.jsx';

export default class ApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedApplication: this.props.applications[0] || []
    };
  }

  handleClick(application) {
    // console.log(application);
    this.setState({ selectedApplication: application });
  }

  render() {
    const segmentStyle = { padding: 0 };
    const applications = this.props.applications || [];
    return (<div>

      <MuiThemeProvider>
        <Drawer application={this.state.selectedApplication} />
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
                  <Table.Cell>{application.stage}</Table.Cell>
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

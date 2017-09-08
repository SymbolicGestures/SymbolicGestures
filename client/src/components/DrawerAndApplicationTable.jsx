import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { format } from 'date-fns';

import MateUiRightDrawer from './MateUiRightDrawer.jsx';



export default class DrawerAndApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectAppIdx: 0,
      selectedApplication: this.props.applications[0] || [],
      isDrawerOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applications.length > 0) {
      this.setState({
        selectedApplication: nextProps.applications[this.state.selectAppIdx]
      });
    }
  }

  handleClick(application, idx) {
    this.setState({
      selectAppIdx: idx,
      selectedApplication: application,
      isDrawerOpen: true
    });
  }

  closeDrawer() { this.setState({ isDrawerOpen: false }); }

  render() {
    const segmentStyle = { padding: 0 };
    const applications = this.props.applications || [];
    const stageNameToColorHash = this.props.stageNameToColorHash || {};
    return (<div>
      <MuiThemeProvider>
        <MateUiRightDrawer
          application={this.state.selectedApplication}
          isDrawerOpen={this.state.isDrawerOpen}
          handleAddButtonClick={this.handleAddButtonClick}
          closeDrawer={this.closeDrawer}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
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
                <Table.Row key={idx} onClick={() => (this.handleClick(application, idx))}>
                  <Table.Cell>{application.created_at}</Table.Cell>
                  <Table.Cell>{application.company_name}</Table.Cell>
                  <Table.Cell>{application.job_title}</Table.Cell>
                  <Table.Cell
                    style={stageNameToColorHash[application.stage]}
                  >{application.stage}</Table.Cell>
                  <Table.Cell>{application.job_posting_link}</Table.Cell>
                  <Table.Cell>{application.job_posting_source}</Table.Cell>
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

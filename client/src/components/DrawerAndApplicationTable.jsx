import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { format } from 'date-fns';

import MateUiRightDrawer from './MateUiRightDrawer.jsx';
import DropdownExampleImage from './DropdownExampleImage.jsx';


export default class DrawerAndApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectAppIdx: 0,
      selectedApplication: this.props.applications[0] || [],
      isDrawerOpen: false,
    };

    this.openDrawerWhenOneAppClick = this.openDrawerWhenOneAppClick.bind(this);
    this.setSelectAppToNewApp = this.setSelectAppToNewApp.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applications.length > 0) {
      this.setState({
        selectedApplication: nextProps.applications[this.state.selectAppIdx]
      });
    }
  }


  setSelectAppToNewApp() {
    console.log('setSelect:', this.props.applications[0]);
    this.setState({
      selectAppIdx: 0,
      selectedApplication: this.props.applications[0]
    });
  }

  openDrawerWhenOneAppClick(application, idx) {
    this.setState({
      selectAppIdx: idx,
      selectedApplication: application,
      isDrawerOpen: true
    });
  }

  openDrawer() { this.setState({ isDrawerOpen: true }); }
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
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
          getApplicationsFromDB={this.props.getApplicationsFromDB}
          setSelectAppToNewApp={this.setSelectAppToNewApp}
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
                <Table.Row
                  key={idx}
                  onClick={() => (this.openDrawerWhenOneAppClick(application, idx))}
                >
                  <Table.Cell>{application.created_at}</Table.Cell>
                  <Table.Cell>{application.company_name}</Table.Cell>
                  <Table.Cell>{application.job_title}</Table.Cell>
                   <Table.Cell
                    style={stageNameToColorHash[application.stage]}
                  >{application.stage}</Table.Cell> 
                  {/* <Table.Cell style={stageNameToColorHash[application.stage]}>
                    <DropdownExampleImage
                      stageNameToColorHash={stageNameToColorHash}
                      stage={application.stage}
                      updateaOneAppStage={this.props.updateaOneAppStage}
                      applicationIdx={idx}
                      stages_settings={this.props.stages_settings}
                      application={application}
                      getApplicationsFromDB={this.props.getApplicationsFromDB}
                    />
                  </Table.Cell>  */}
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

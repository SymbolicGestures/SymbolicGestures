import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import { format } from 'date-fns';

import MateUiRightDrawer from './MateUiRightDrawer.jsx';
import DropDownWithZeroPadding from './DropDownWithZeroPadding.jsx';


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
    // console.log('setSelect:', this.props.applications[0]);
    this.setState({
      selectAppIdx: 0,
      selectedApplication: this.props.applications[0]
    });
  }

  openDrawerWhenOneAppClick(application, idx, e) {

    e.preventDefault();

    this.setState({
      selectAppIdx: idx,
      selectedApplication: application,
      isDrawerOpen: true
    });
  }

  openDrawer() { this.setState({ isDrawerOpen: true }); }
  closeDrawer() { this.setState({ isDrawerOpen: false }); }

  render() {
    // applications={this.state.applications}
    // stages_settings={this.state.stages_settings}
    // stageNameToColorHash={this.state.stageNameToColorHash}
    // getApplicationsFromDB={this.getApplicationsFromDB}
    // updateOneAppStage={this.updateOneAppStage}
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
          stages_settings={this.props.stages_settings}
          stageNameToColorHash={this.props.stageNameToColorHash}
          updateOneAppStage={this.props.updateOneAppStage}
          selectAppIdx={this.state.selectAppIdx}
        />
      </MuiThemeProvider>
      <Segment style={segmentStyle}>

        <Table selectable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell> </Table.HeaderCell>
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
              let tdStyle = { padding: '0px', height: '1px', paddingTop: '0.2%' };
              let combineStyle = Object.assign({}, tdStyle, stageNameToColorHash[application.stage]);
              return (
                <Table.Row
                  key={idx}
                >
                  <Table.Cell
                    onClick={(e) => (this.openDrawerWhenOneAppClick(application, idx, e))}
                    style={{ cursor: 'pointer' }}
                    collapsing
                  >
                    <Icon style={{ color: 'black' }} name="chevron left" />
                  </Table.Cell>
                  <Table.Cell>{application.created_at}</Table.Cell>
                  <Table.Cell>{application.company_name}</Table.Cell>
                  <Table.Cell>{application.job_title}</Table.Cell>

                  <Table.Cell style={combineStyle}>
                    <DropDownWithZeroPadding
                      getApplicationsFromDB={this.props.getApplicationsFromDB}
                      application={application}
                      stageNameToColorHash={this.props.stageNameToColorHash}
                      stage={application.stage}
                      updateOneAppStage={this.props.updateOneAppStage}
                      selectAppIdx={idx}
                      stages_settings={this.props.stages_settings}
                    />
                  </Table.Cell>
                  <TableCellLink job_posting_link={application.job_posting_link} />
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


const TableCellLink = ({ job_posting_link }) => {
  if (job_posting_link) {
    return (
      <Table.Cell
        style={{ textAlign: 'center' }}
      ><a href={job_posting_link}><u>Link</u></a></Table.Cell>  
    );
  }
  return (
    <Table.Cell
      style={{ textAlign: 'center' }}
    >No Link</Table.Cell>
  );
};



// {/* <DropdownExampleImage
//   getApplicationsFromDB={this.props.getApplicationsFromDB}
//   application={application}
//   stageNameToColorHash={stageNameToColorHash}
//   stage={application.stage}
//   updateOneAppStage={this.props.updateOneAppStage}
//   applicationIdx={idx}
//   stages_settings={this.props.stages_settings}
// /> */}
// {/* <AppDrawerInfoDropDown
//   getApplicationsFromDB={this.props.getApplicationsFromDB}
//   application={application}
//   stageNameToColorHash={this.props.stageNameToColorHash}
//   stage={application.stage}
//   updateOneAppStage={this.props.updateOneAppStage}
//   selectAppIdx={idx}
//   stages_settings={this.props.stages_settings}
// />  */}
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
              let tdStyle = { padding: '0px', height: '1px', 'padding-top': '0.2%' };
              let combineStyle = Object.assign({}, tdStyle, stageNameToColorHash[application.stage]);
              return (
                <Table.Row
                  key={idx}
                  onClick={() => (this.openDrawerWhenOneAppClick(application, idx))}
                >
                  <Table.Cell color="olive" collapsing><Icon name='chevron left' /></Table.Cell>
                  <Table.Cell width={2}>{application.created_at}</Table.Cell>
                  <Table.Cell width={4}>{application.company_name}</Table.Cell>
                  <Table.Cell width={5}>{application.job_title}</Table.Cell>
                  {console.log(Object.assign({}, tdStyle))}
                  {console.log(Object.assign({}, tdStyle, stageNameToColorHash[application.stage]))} 
                  {console.log(combineStyle)} 

                  {/* <Table.Cell
                    style={stageNameToColorHash[application.stage]}
                  >{application.stage}</Table.Cell> */}
                  {/* <Table.Cell width={3} style={stageNameToColorHash[application.stage]}> */}
                  {/* <Table.Cell width={2} style={Object.assgin(tdStyle, stageNameToColorHash[application.stage])}> */}
                  <Table.Cell width={2} style={combineStyle}>
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
                  <Table.Cell width={1}><a href={application.job_posting_link}>Link</a></Table.Cell>
                  <Table.Cell width={2}>{application.job_posting_source}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

      </Segment>

      <Table celled compact definition>
        <Table.Header fullWidth>
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
          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              <Button floated='right' icon labelPosition='left' primary size='small'>
                <Icon name='user' /> Add User
              </Button>
              <Button size='small'>Approve</Button>
              <Button disabled size='small'>Approve All</Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
    );
  }
}


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
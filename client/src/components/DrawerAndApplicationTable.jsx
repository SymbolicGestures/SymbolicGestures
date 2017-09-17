import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import { parse, getTime, format } from 'date-fns';

import MateUiRightDrawer from './MateUiRightDrawer.jsx';
import DropDownWithZeroPadding from './DropDownWithZeroPadding.jsx';

// Table Header Cells
import THCellStarIcon from './TableHeadCells/THCellStarIcon.jsx';
import THCellDateApplied from './TableHeadCells/THCellDateApplied.jsx';

// TableCells
// import TableCellJPLink from './TableCells/TableCellJPLink.jsx';
import TableCellJPLink from './TableCells/TableCellJPLink.jsx';
import TableCellJobTitle from './TableCells/TableCellJobTitle.jsx';
import TableCellCompanyName from './TableCells/TableCellCompanyName.jsx';
import TableCellJPSource from './TableCells/TableCellJPSource.jsx';
import ConditionalTableCell from './TableCells/ConditionalTableCell.jsx';

import TableCellWArrowIcon from './TableCells/TableCellWArrowIcon.jsx';
import TableCellWStarIcon from './TableCells/TableCellWStarIcon.jsx';

const seanStyleBox = require('./../../styles/seanStyleBox.css');


export default class DrawerAndApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedAppIdx: 0,
      selectedApplication: this.props.applications[0] || [],
      isDrawerOpen: false,
      selectedAppIdxForArrowIcon: '',
    };

    this.openDrawerWhenOneAppClick = this.openDrawerWhenOneAppClick.bind(this);
    this.setSelectAppToNewApp = this.setSelectAppToNewApp.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.attemptWebScrape = this.attemptWebScrape.bind(this);
    // this.updateJobPostingSource = this.updateJobPostingSource.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applications.length > 0) {
      this.setState({
        selectedApplication: nextProps.applications[this.state.selectedAppIdx]
      });
    }
  }

  /**
   * Attempts to scrape a website for the application information and update
   * info to it.
   * @param  {integer} idx  The index of the application currently open.
   * @param  {string} link  The web address of the application.
   */
  attemptWebScrape(idx, link) {
    let changedValues = false,
        route = `/api/applications/${this.state.selectedApplication.id}`,
        body = {};
    console.log(this.state.selectedApplication);

    link = {'website': link};
    axios.post('api/webScraper', link)
      .then((data) => {
        const jobInfo = data.data;
        console.log(jobInfo);
        for (let key in jobInfo) {
          if(!this.state.selectedApplication[key] && key !== 'logo') {
            changedValues = true;
            body[key] = jobInfo[key];
            this.props.updateOneKeyValPairInFE(idx, key, jobInfo[key]);
          }
        }
        if (changedValues) {
          axios.post(route, body);
        }
      });
  }

  setSelectAppToNewApp() {
    // console.log('setSelect:', this.props.applications[0]);
    this.setState({
      selectedAppIdx: 0,
      selectedAppIdxForArrowIcon: 0,
      selectedApplication: this.props.applications[0]
    });
  }

  openDrawerWhenOneAppClick(application, idx, e) {
    console.log('openDrawerWhenOneAppClick');

    e.preventDefault();

    this.setState({
      selectedAppIdx: idx,
      selectedApplication: application,
      isDrawerOpen: true,
      selectedAppIdxForArrowIcon: idx,
    });
  }

  openDrawer() { this.setState({ isDrawerOpen: true }); }
  closeDrawer() { this.setState({ isDrawerOpen: false, selectedAppIdxForArrowIcon: '', }); }


  handleMouseEnter() {
    console.log('hover!!!');
  }
  handleMouseLeave() {
    console.log('leave!!!');
  }

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
          selectedAppIdx={this.state.selectedAppIdx}
          createNewApplicationInFE={this.props.createNewApplicationInFE}
          updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
          attemptWebScrape={this.attemptWebScrape}
        />
      </MuiThemeProvider>
      <Segment style={segmentStyle}>

        <Table selectable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell> {' '} </Table.HeaderCell>
              {/* <Table.HeaderCell
                onClick={this.props.sortAppsByIsFavorite}
                style={{ cursor: 'pointer' }}
              > <Icon style={{ color: '#ffd042' }} name="star" /> </Table.HeaderCell> */}
              <THCellStarIcon
                sortAppsByIsFavorite={this.props.sortAppsByIsFavorite}
              />
              {/* <Table.HeaderCell
                onClick={() => this.props.sortAppsByDate(this.props.isDateDescendingOrder)}
                style={{ cursor: 'pointer' }}
              >Date Applied
                <Icon name="sort" />
                <Icon name="sort" color="red"/>
              </Table.HeaderCell>  */}
              <THCellDateApplied
                sortAppsByDate={this.props.sortAppsByDate}
                isDateDescendingOrder={this.props.isDateDescendingOrder}
              />
              <Table.HeaderCell
                onClick={() => this.props.sortAppsByAlphaOrder('company_name', this.props.isAlphabetOrder)}
                style={{ cursor: 'pointer' }}
              >Company Name</Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => this.props.sortAppsByAlphaOrder('job_title', this.props.isAlphabetOrder)}
                style={{ cursor: 'pointer' }}
              >Job Title</Table.HeaderCell>
              {/* <Table.HeaderCell>Stage</Table.HeaderCell> */}
              <Table.HeaderCell
                onClick={() => this.props.sortAppsByStageOrder(this.props.isStageOrder)}
                style={{ cursor: 'pointer' }}
              >Stage</Table.HeaderCell>
              <Table.HeaderCell>Link</Table.HeaderCell>
              {/* <Table.HeaderCell>Source</Table.HeaderCell> */}
              <Table.HeaderCell
                onClick={() => this.props.sortAppsByAlphaOrder('job_posting_source', this.props.isAlphabetOrder)}
                style={{ cursor: 'pointer' }}
              >Source</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {applications.map((application, idx) => {
              let tdStyle = { padding: '0px', height: '1px', paddingTop: '0.2%' };
              let rowColor = idx === this.state.selectedAppIdxForArrowIcon ? 'red' : '';
              let dateStyle = { paddingLeft: 0, paddingRight: 0, width: '7.5%' };
              return (
                <Table.Row key={idx}>
                  {/* <Table.Cell
                    onClick={(e) => (this.openDrawerWhenOneAppClick(application, idx, e))}
                    style={{ cursor: 'pointer' }}
                    collapsing
                  >
                    <Icon style={{ color: 'black' }} name="chevron left" /></Table.Cell> */}
                  <TableCellWArrowIcon
                    openDrawerWhenOneAppClick={this.openDrawerWhenOneAppClick}
                    closeDrawer={this.closeDrawer}
                    application={application}
                    idx={idx}
                    selectedAppIdxForArrowIcon={this.state.selectedAppIdxForArrowIcon}
                  />
                  {/* <Table.Cell>{application.created_at}</Table.Cell> */}
                  <TableCellWStarIcon
                    openDrawerWhenOneAppClick={this.openDrawerWhenOneAppClick}
                    closeDrawer={this.closeDrawer}
                    applications={applications}
                    application={application}
                    idx={idx}
                    selectedAppIdxForArrowIcon={this.state.selectedAppIdxForArrowIcon}
                    toggleIsFavoriteForOneAppInFE={this.props.toggleIsFavoriteForOneAppInFE}
                  />
                  {/* style={dateStyle} */}
                  <Table.Cell>{format(parse(application.created_at), 'ddd, MMM DD, YY')}</Table.Cell>
                  <ConditionalTableCell
                    application={application}
                    appKey={'company_name'}
                    placeHolder={'Company Name'}
                    updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
                    idx={idx}
                    cellStyle={{ padding: '0.2% 0.2% 0px 0.2%' }}  
                  />
                  <ConditionalTableCell
                    application={application}
                    appKey={'job_title'}
                    placeHolder={'Job Title'}
                    updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
                    idx={idx}
                    cellStyle={{ padding: '0.2% 0.2% 0px 0.2%' }}
                  />
                  <Table.Cell style={tdStyle}>
                    <DropDownWithZeroPadding
                      getApplicationsFromDB={this.props.getApplicationsFromDB}
                      application={application}
                      stageNameToColorHash={this.props.stageNameToColorHash}
                      stage={application.stage}
                      updateOneAppStage={this.props.updateOneAppStage}
                      selectedAppIdx={idx}
                      stages_settings={this.props.stages_settings}
                    /></Table.Cell>
                  {/* <TableCellJPLink job_posting_link={application.job_posting_link} /> */}
                  <ConditionalTableCell
                    application={application}
                    appKey={'job_posting_link'}
                    placeHolder={'Link'}
                    updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
                    attemptWebScrape={this.attemptWebScrape}
                    idx={idx}
                    cellStyle={{ padding: '0.2% 0.2% 0px 0.2%', width: '7.5%' }}
                  />
                  <ConditionalTableCell
                    application={application}
                    appKey={'job_posting_source'}
                    placeHolder={'Source'}
                    updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
                    idx={idx}
                    cellStyle={{ padding: '0.2% 0.2% 0px 0.2%', width: '10%' }}
                  />
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




// const TableCellJPLink = ({ job_posting_link }) => {
//   if (job_posting_link) {
//     return (
//       <Table.Cell
//         style={{ textAlign: 'center' }}
//       ><a href={job_posting_link}><u>Link</u></a></Table.Cell>
//     );
//   }
//   return (
//     <Table.Cell
//       style={{ textAlign: 'center' }}
//     >No Link</Table.Cell>
//   );
// };


// {/* <Table.Row
//   key={idx}
//   style={{ backgroundColor: rowColor }}
// > */}

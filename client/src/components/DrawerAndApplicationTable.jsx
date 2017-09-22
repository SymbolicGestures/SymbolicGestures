import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { parse, format } from 'date-fns';
import PropTypes from 'prop-types';

import MainDrawer from './MainDrawer.jsx';

// Table Header Cells
import THCellStarIcon from './TableHeadCells/THCellStarIcon.jsx';
import THCellDateApplied from './TableHeadCells/THCellDateApplied.jsx';

// TableCells
import ConditionalTableCell from './TableCells/ConditionalTableCell.jsx';
import TableCellWArrowIcon from './TableCells/TableCellWArrowIcon.jsx';
import TableCellWStarIcon from './TableCells/TableCellWStarIcon.jsx';
import DropDownInTableCell from './TableCells/DropDownInTableCell.jsx';


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

  setSelectAppToNewApp() {
    this.setState({
      selectedAppIdx: 0,
      selectedApplication: this.props.applications[0]
    });
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

    link = { 'website': link };
    axios.post('api/webScraper', link)
      .then((data) => {
        const jobInfo = data.data;
        for (let key in jobInfo) {
          if (!this.state.selectedApplication[key]) {
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

  openDrawerWhenOneAppClick(application, idx, e) {
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

  render() {
    const segmentStyle = { padding: 0 };
    const applications = this.props.applications || [];
    return (<div>
      <MuiThemeProvider>
        <MainDrawer
          application={this.state.selectedApplication}
          isDrawerOpen={this.state.isDrawerOpen}
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

        <Table selectable singleLine>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell> {' '} </Table.HeaderCell>
              <THCellStarIcon sortAppsByIsFavorite={this.props.sortAppsByIsFavorite} />
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
              <Table.HeaderCell
                onClick={() => this.props.sortAppsByStageOrder(this.props.isStageOrder)}
                style={{ cursor: 'pointer' }}
              >Stage</Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => this.props.sortAppsByAlphaOrder('job_posting_source', this.props.isAlphabetOrder)}
                style={{ cursor: 'pointer' }}
              >Source</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {applications.map((application, idx) => {
              let tdStyle = { padding: '0px', height: '1px', paddingTop: '0.2%' };
              return (
                <Table.Row key={idx}>
                  <TableCellWArrowIcon
                    openDrawerWhenOneAppClick={this.openDrawerWhenOneAppClick}
                    closeDrawer={this.closeDrawer}
                    application={application}
                    idx={idx}
                    selectedAppIdxForArrowIcon={this.state.selectedAppIdxForArrowIcon}
                  />
                  <TableCellWStarIcon
                    applications={applications}
                    application={application}
                    idx={idx}
                    toggleIsFavoriteForOneAppInFE={this.props.toggleIsFavoriteForOneAppInFE}
                  />
                  <Table.Cell>{format(parse(application.applied_at), 'ddd, MMM DD, YY')}</Table.Cell>
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
                    <DropDownInTableCell
                      getApplicationsFromDB={this.props.getApplicationsFromDB}
                      application={application}
                      stageNameToColorHash={this.props.stageNameToColorHash}
                      stage={application.stage}
                      updateOneAppStage={this.props.updateOneAppStage}
                      selectedAppIdx={idx}
                      stages_settings={this.props.stages_settings}
                    /></Table.Cell>
                  <ConditionalTableCell
                    application={application}
                    appKey={'job_posting_source'}
                    placeHolder={'Source Link'}
                    updateOneKeyValPairInFE={this.props.updateOneKeyValPairInFE}
                    attemptWebScrape={this.attemptWebScrape}
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


// Parent: app.jsx
DrawerAndApplicationTable.propTypes = {
  applications: PropTypes.array,
  stages_settings: PropTypes.array,
  stageNameToColorHash: PropTypes.object,
  getApplicationsFromDB: PropTypes.func,
  updateOneAppStage: PropTypes.func,
  updateOneKeyValPairInFE: PropTypes.func,
  createNewApplicationInFE: PropTypes.func,
  sortAppsByAlphaOrder: PropTypes.func,
  isAlphabetOrder: PropTypes.bool,
  isStageOrder: PropTypes.bool,
  isDateDescendingOrder: PropTypes.bool,
  sortAppsByStageOrder: PropTypes.func,
  sortAppsByDate: PropTypes.func,
  sortAppsByIsFavorite: PropTypes.func,
  toggleIsFavoriteForOneAppInFE: PropTypes.func,
};

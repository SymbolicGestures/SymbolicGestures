import React, { Component } from 'react';

import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

export default class THCellCompanyName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSortActivate: false,
    };
    this.toggleSortIcon = this.toggleSortIcon.bind(this);
  }

  toggleSortIcon() {
    // console.log(this.state.isSortActivate);
    this.setState({ isSortActivate: !this.state.isSortActivate });
  }

  render() {
    const cellStyle = { cursor: 'pointer', paddingRight: 0, width: '10%' };
    if (this.state.isSortActivate) {
      return (
        <Table.HeaderCell
          onMouseLeave={this.toggleSortIcon}
          onClick={() => this.props.sortAppsByDate(this.props.isDateDescendingOrder)}
          style={cellStyle}
        >Company Name
          <Icon name="sort" color="red" />
        </Table.HeaderCell>
      );
    }
    return (
      <Table.HeaderCell
        onMouseEnter={this.toggleSortIcon}
        onClick={() => this.props.sortAppsByDate(this.props.isDateDescendingOrder)}
        style={cellStyle}
      >Company Name
        <Icon name="sort" />
      </Table.HeaderCell>
    );
  }
}

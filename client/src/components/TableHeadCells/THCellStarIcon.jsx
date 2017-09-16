import React, { Component } from 'react';

import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

export default class THCellStarIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyStar: true,
    };
    this.toggleStar = this.toggleStar.bind(this);
  }

  toggleStar() {
    console.log(this.state.isEmptyStar);
    this.setState({ isEmptyStar: !this.state.isEmptyStar });
  }

  render() {
    if (this.state.isEmptyStar) {
      return (
        <Table.HeaderCell
          onMouseEnter={this.toggleStar}
          onClick={this.props.sortAppsByIsFavorite}
          style={{ cursor: 'pointer' }}
        > <Icon name="empty star" /> </Table.HeaderCell>
      );
    }
    return (
      <Table.HeaderCell
        onMouseLeave={this.toggleStar}
        onClick={this.props.sortAppsByIsFavorite}
        style={{ cursor: 'pointer' }}
      > <Icon style={{ color: '#ffd042' }} name="star" /> </Table.HeaderCell>
    );
  }
}

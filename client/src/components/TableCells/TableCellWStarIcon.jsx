import React, { Component } from 'react';
import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

class TableCellWStarIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  render() {
    if (this.props.application.isFavorite) {
      return (
        <Table.Cell
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.toggleIsFavoriteForOneAppInFE(this.props.applications, this.props.idx)}
          collapsing
        >
          <Icon style={{ color: '#ffd042' }} name="star" />
        </Table.Cell>
      );
    }
    return (
      <Table.Cell
        style={{ cursor: 'pointer' }}
        onClick={() => this.props.toggleIsFavoriteForOneAppInFE(this.props.applications, this.props.idx)}
        collapsing
      >
        <Icon style={{ color: 'black' }} name="empty star" />
      </Table.Cell>
    );
  }
}

export default TableCellWStarIcon;

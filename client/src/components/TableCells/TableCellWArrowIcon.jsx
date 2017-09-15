import React, { Component } from 'react';
import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

class TableCellWArrowIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  render() {
    let openDrawerWhenOneAppClick = this.props.openDrawerWhenOneAppClick;
    let application = this.props.application;
    let idx = this.props.idx;
    if (idx === this.props.selectedAppIdxForArrowIcon) {
      return (
        <Table.Cell
          onClick={this.props.closeDrawer}
          style={{ cursor: 'pointer' }}
          collapsing
        >
          <Icon style={{ color: 'red' }} name="chevron right" />
        </Table.Cell>
      );
    }
    return (
      <Table.Cell
        onClick={(e) => openDrawerWhenOneAppClick(application, idx, e)}
        style={{ cursor: 'pointer' }}
        collapsing
      >
        <Icon style={{ color: 'black' }} name="chevron left" />
      </Table.Cell>
    );
  }
}

export default TableCellWArrowIcon;

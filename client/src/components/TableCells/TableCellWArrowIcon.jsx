import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';

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


// Parent: DrawerAndApplicationTable.jsx
TableCellWArrowIcon.propTypes = {
  openDrawerWhenOneAppClick: PropTypes.func,
  closeDrawer: PropTypes.func,
  application: PropTypes.array,
  idx: PropTypes.number,
  selectedAppIdxForArrowIcon: PropTypes.string,
};

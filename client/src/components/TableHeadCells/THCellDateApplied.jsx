import React, { Component } from 'react';

import { Table, Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

export default class THCellDateApplied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyStar: true,
    };
    this.toggleStar = this.toggleStar.bind(this);
  }

  toggleStar() {
    // console.log(this.state.isEmptyStar);
    this.setState({ isEmptyStar: !this.state.isEmptyStar });
  }

  render() {
    const cellStyle = { cursor: 'pointer', paddingRight: 0, width: '10%' };
    const sortCaretStyle = { marginLeft: '10%' };
    if (this.state.isEmptyStar) {
      return (
        <Table.HeaderCell
          onMouseEnter={this.toggleStar}
          onClick={() => this.props.sortAppsByDate(this.props.isDateDescendingOrder)}
          style={cellStyle}
        >Date Applied
          <Icon name="sort" sytle={sortCaretStyle} />
        </Table.HeaderCell>
      );
    }
    return (
      <Table.HeaderCell
        onMouseLeave={this.toggleStar}
        onClick={() => this.props.sortAppsByDate(this.props.isDateDescendingOrder)}
        style={cellStyle}
      >Date Applied
        <Icon name="sort" color="red" sytle={sortCaretStyle} />
      </Table.HeaderCell>
    );
  }

}

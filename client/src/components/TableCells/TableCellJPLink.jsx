import React from 'react';
import { Table } from 'semantic-ui-react';

const TableCellJPLink = ({ job_posting_link }) => {
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

export default TableCellJPLink;

import React from 'react';
import { Table, Form } from 'semantic-ui-react';

const TableCellJPLink = ({ job_posting_link }) => {
  if (job_posting_link) {
    return (
      <Table.Cell
        style={{ textAlign: 'center' }}
      ><a href={job_posting_link}><u>Link</u></a></Table.Cell>
    );
  }
  return (
    <Table.Cell style={{ padding: '0.2% 0.2% 0px 0.2%', width: '7.5%' }}>
      <Form>
        <Form.Field>
          <input placeholder="Link" />
        </Form.Field>
      </Form>
    </Table.Cell>
  );
};

export default TableCellJPLink;

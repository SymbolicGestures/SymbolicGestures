import React from 'react';
import { Table, Form } from 'semantic-ui-react';

const TableCellJPSource = ({ job_posting_source }) => {
  if (job_posting_source) { return (<Table.Cell>{job_posting_source}</Table.Cell>); }
  return (
    <Table.Cell style={{ padding: '0.2% 0.2% 0px 0.2%', width: '10%' }}>
      <Form>
        <Form.Field>
          <input placeholder="Source" />
        </Form.Field>
      </Form>
    </Table.Cell>
  );
};

export default TableCellJPSource;


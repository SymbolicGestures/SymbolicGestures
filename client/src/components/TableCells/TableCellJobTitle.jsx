import React from 'react';
import { Table, Form } from 'semantic-ui-react';

const TableCellJobTitle = ({ job_title }) => {
  if (job_title) { return (<Table.Cell>{job_title}</Table.Cell>); }
  return (
    <Table.Cell style={{ padding: '0.2% 0.2% 0px 0.2%' }}>
      <Form>
        <Form.Field>
          <input placeholder="Job Title" />
        </Form.Field>
      </Form>
    </Table.Cell>
  );
};

export default TableCellJobTitle;


import React from 'react';
import { Table, Form } from 'semantic-ui-react';

const TableCellJobTitle = ({ job_title }) => {
  if (job_title) { return (<Table.Cell>{job_title}</Table.Cell>); }
  return (
    <Form>
      <Form.Field style={{ padding: '0.5%' }}>
        <input placeholder="Job Title" />
      </Form.Field>
    </Form>
  );
};

export default TableCellJobTitle;


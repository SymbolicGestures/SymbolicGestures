import React from 'react';
import { Table } from 'semantic-ui-react';

const TableCellCompanyName = ({ company_name }) => {
  if (company_name) { return (<Table.Cell>{company_name}</Table.Cell>); }
  return (
    <Form>
      <Form.Field style={{ padding: '0.5%' }}>
        <input placeholder='First Name' />
      </Form.Field>
    </Form>
  );
};

export default TableCellCompanyName;


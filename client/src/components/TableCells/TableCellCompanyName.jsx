import React from 'react';
import { Table, Form } from 'semantic-ui-react';

const TableCellCompanyName = ({ company_name }) => {
  // console.log('here???');
  // console.log('companyName:', company_name);
  // console.log('companyName:', !company_name);
  if (company_name) { return (<Table.Cell>{company_name}</Table.Cell>); }
  return (
    <Table.Cell style={{ padding: '0.2% 0.2% 0px 0.2%' }}>
      <Form>
        <Form.Field>
          <input placeholder="Company Name" />
        </Form.Field>
      </Form>
    </Table.Cell>
  );
};

export default TableCellCompanyName;


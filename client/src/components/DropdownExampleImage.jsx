import React from 'react';
import { Dropdown } from 'semantic-ui-react';

// import { friendOptions } from '../common'

let friendOptions = [1, 2, 3, 4, 5];

const DropdownExampleIcon = () => (
  <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Filter by tag' />
      <Dropdown.Divider />
      <Dropdown.Item icon='attention' text='Important' />
      <Dropdown.Item icon='comment' text='Announcement' />
      <Dropdown.Item icon='conversation' text='Discussion' />
    </Dropdown.Menu>
  </Dropdown>
)


export default DropdownExampleImage;

import React from 'react';
import { Dropdown } from 'semantic-ui-react';

let SelectStageChoice = (props) => {
  return (
    <Dropdown defaultValue={1}>
      <Dropdown.Menu>
        <Dropdown.Item value={1} content={'OFFER'} />
        <Dropdown.Item content={'Phone Screen'}/>
        <Dropdown.Item content={'On Site'}/>
        <Dropdown.Item content={'Denied'} />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SelectStageChoice;

SelectStageChoice.propTypes = {

}

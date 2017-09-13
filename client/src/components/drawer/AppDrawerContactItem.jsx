import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { List } from 'semantic-ui-react';

const stylePaper = {
  height: 100,
  width: 300,
  margin: 5,
  padding: 10,
  textAlign: 'center',
  display: 'flex',
};

const iconIconMenu ={
  float: 'right',
  display: 'inline',
  position: 'absolute'
}

const style = {
  marginRight: 20,
};

class AppDrawerContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDeleteContact(event) {
   console.log('delete the contact with this id:' , this.props.contact.id)
  }
  handleEdit(event) {
   console.log('edit the contact with this id:' , this.props.contact.id)
  }

  render() {
    return (
      <div>
            <Paper style={stylePaper} zDepth={1}
              children={
                <div>

                  <List>
                    {/* <div style={iconIconMenu}>
                      <IconMenu

                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                          <MenuItem primaryText="Edit" onClick={this.handleEdit}/>
                          <MenuItem primaryText="Delete" onClick={this.handleDeleteContact}/>
                        </IconMenu>
                      </div> */}
                    <List.Item>
                      <List.Icon name='user circle' />
                      <List.Content>{this.props.contact.name}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='travel' />
                      <List.Content>{this.props.contact.role}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='mail' />
                      <List.Content>
                        <a href={this.props.contact.email}>{this.props.contact.email}</a>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='phone' />
                      <List.Content>{this.props.contact.phone}</List.Content>
                    </List.Item>
                  </List>

                </div>
              }
            />
      </div>
    );
  }
}

export default AppDrawerContactItem;

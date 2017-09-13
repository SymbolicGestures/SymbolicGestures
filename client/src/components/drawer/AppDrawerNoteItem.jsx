import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

import axios from 'axios';

class AppDrawerNoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      noteId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note[0]) {
      this.setState({
        note: nextProps.note[0].note,
        noteId: nextProps.note[0].id
      });
    }
  }

  handleChange(event) {
   this.setState({note: event.target.value})
  }

  handleBlur(event) {
    let route = `/api/notes/${this.state.noteId}`;
    let key = 'note'
    let val = event.target.value;
    let body = {};
    body[key] = val;
    axios.post(route, body)
      .then(this.props.getApplicationsFromDB());
    // .then((message) => {console.log(message)})
  }

  // handleBlur(event) {
  //   let route = `/api/applications/${this.props.application.id}`;
  //   let key = event.target.id;
  //   let val = event.target.value;
  //   let body = {};
  //   body[key] = val;
  //   axios.post(route, body)
  //     .then(this.props.getApplicationsFromDB());
  //   // .then((message) => {console.log(message)})
  // }


  render() {
    return (
      <div>
        <Form>
          <TextArea
            autoHeight
            placeholder='Try adding multiple lines'
            style={{ minHeight: 100 }}
            value = {this.state.note || ''}
            onChange = {this.handleChange}
            onBlur={this.handleBlur}

          />
        </Form>
      </div>
    );
  }
}

export default AppDrawerNoteItem;

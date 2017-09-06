import React from 'react';

class AppDrawerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>AppDrawerInfo</h2>
        <div> {this.props.application.created_at} </div>
        <div> {this.props.application.company_name} </div>
        <div> {this.props.application.job_title} </div>
        <div> {this.props.application.stage} </div>
        <div> {this.props.application.job_posting_link} </div>
        <div> {this.props.application.job_posting_source} </div>
        <div> {this.props.application.applied_at} </div>
        <div> {this.props.application.updated_at} </div>
        <div> {this.props.application.locaton} </div>
        <div> {this.props.application.job_posting_to_pdf_link} </div>
     </div>
    );
  }
}

export default AppDrawerInfo;

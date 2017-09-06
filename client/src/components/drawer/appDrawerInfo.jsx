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
        <div> {this.props.application.createdAt} </div>
        <div> {this.props.application.company_name} </div>
        <div> {this.props.application.job_title} </div>
        <div> {this.props.application.stage} </div>
        <div> {this.props.application.jobPostingLink} </div>
        <div> {this.props.application.jobPostingSource} </div>
        <div> {this.props.application.appliedAt} </div>
        <div> {this.props.application.updatedAt} </div>
        <div> {this.props.application.locaton} </div>
        <div> {this.props.application.jobPostingToPdfLink} </div>
     </div>
    );
  }
}

export default AppDrawerInfo;

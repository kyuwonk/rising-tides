/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ApplicationView extends React.Component {

  goBack = (e) => {
    e.preventDefault();
    window.location = `/applications`;
  }

  render() {
    const { application } = this.props;

    return (
      <a onClick={this.goBack}>Back</a>
      <div>
          <h3>Question1</h3>
          <p>{application.question1}</p>
          <h3>Question2</h3>
          <p>{application.question2}</p>
          <h3>Question3</h3>
          <p>{application.question3}</p>
      </div>
    );
  }
}

export default ApplicationView;
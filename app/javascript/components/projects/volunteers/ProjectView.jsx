/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ProjectView extends React.Component {

  goToApplication = () => {
    window.location.href = `/projects/${this.props.project.id}/applications/new`;
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/projects";
  }

  render() {
    const { project } = this.props;

    return (
      <div>
          <a onClick={this.goBack}>Back</a>
          <h1>View Project</h1>
          <h3>{project.title}</h3>
          <h4>Description</h4>
          <p>{project.description}</p>
          <br />
          <button onClick={this.goToApplication}>Apply</button>
      </div>
    );
  }
}

export default ProjectView;
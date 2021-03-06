/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ProjectView extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        applications: [],
        organization: null,
    }
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.project.id}/applications`).then(ret => {
      let applications = ret.data;
      this.setState({ applications });
    });
    if (this.props.project.organization_id != null) {
      console.log(this.props);
      axios.get(`/api/organizations/${this.props.project.organization_id}`).then(ret => {
        let organization = ret.data;
        this.setState({ organization });
      })
    } else {
      console.log(`Project ${this.props.project.id} not tied to an organization!`);
    }
  }

  goToApplication = () => {
    window.location.href = `/projects/${this.props.project.id}/applications/new`;
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/projects";
  }

  render() {
    const { project } = this.props;
    const { organization } = this.state;

    if (organization != null) {
      return (
        <div>
          <a onClick={this.goBack}>Back</a>
          <h1>View Project</h1>
          <h3>{project.title}</h3>
          <h3>Organization: {organization.name}</h3>
          <h4>Brief Description</h4>
          <p>{project.description}</p>
          <h4>Project Plan</h4>
          <p>{project.overview}</p>
          <h4>Professional Skills Needed</h4>
          <p>{project.volunteer_requirements}</p>
          <h4>Project Outputs</h4>
          <p>{project.deliverable}</p>
          <h4>Your Community Needs This If:</h4>
          <p>{project.question1}</p>
          <h4>The Right Volunteer for this Project Is:</h4>
          <p>{project.question2}</p>
          <h4>What You Give, What You Get:</h4>
          <p>{project.question3}</p>
          <br />
          <button onClick={this.goToApplication}>Apply</button>
        </div>
      );
    } else {
      return (
        <div>
          <a onClick={this.goBack}>Back</a>
          <h1>View Project</h1>
          <h3>{project.title}</h3>
          <h3>Organization: Loading...</h3>
          <h4>Brief Description</h4>
          <p>{project.description}</p>
          <h4>Project Plan</h4>
          <p>{project.overview}</p>
          <h4>Professional Skills Needed</h4>
          <p>{project.volunteer_requirements}</p>
          <h4>Project Outputs</h4>
          <p>{project.deliverable}</p>
          <h4>Your Community Needs This If:</h4>
          <p>{project.question1}</p>
          <h4>The Right Volunteer for this Project Is:</h4>
          <p>{project.question2}</p>
          <h4>What You Give, What You Get:</h4>
          <p>{project.question3}</p>
          <br />
          <button onClick={this.goToApplication}>Apply</button>
        </div>
      );
    }
  }
}

export default ProjectView;

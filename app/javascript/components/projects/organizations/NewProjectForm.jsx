import React from "react";
import axios from 'axios';

class NewProjectForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: null,
      title: null,
      description: null,
    };
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handlers = [];
  }

  _handleChange = name => {
    if (!this._handlers[name]) {
      this._handlers[name] = event => {
        this.setState({ [name]: event.target.value });
      };
    }
    return this._handlers[name];
  }

  _handleSubmit(e) {
    e.preventDefault();
    const payload = {
      project: {
        title: this.state.title,
        description: this.state.description,
        organization_id: this.props.organization.id
      }
    }

    axios.post('/api/projects', payload)
      .then(res => {
        this.setState({success: 1});
        window.location.href = '/projects';
      })
      .catch(res => {
        this.setState({success: 0});
        console.log(res);
      });

    console.log(this.state);
    return false;
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/projects";
  }

  render() {
    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>New Project</h1>
        <form onSubmit={this._handleSubmit}>
          <label>
            <span class="container-label">Title</span>
            <input type="text"
                   class="input-box"
                   onChange={this._handleChange('title')} />
          </label>
          <br />
          <label>
            <span class="container-label">Description</span>
            <textarea class="input-area" onChange={this._handleChange('description')}>
            </textarea>
          </label>
          <br />
          <input class="button" value="Create" type="submit" />
        </form>
      </div>
    );
  }

}

export default NewProjectForm;
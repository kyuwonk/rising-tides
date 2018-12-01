import React from "react";
import axios from 'axios';
class Profile extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
      organization: {},
      dataLoaded: false,
    }
  }
   componentDidMount() {
    axios.get('/organizations/' + this.props.organization.id).then((data) => {
      this.setState({
        organization: data,
        dataLoaded: true,
      })
    })
  }
   render() {
    const { organization, dataLoaded } = this.state;
    let pageContent;
     if (!dataLoaded) {
      return (<div className="">Loading...</div>)
    } else {
      return (
        <div className="">
          <h2 className="">Organization Details</h2>
          <h3>Name</h3>
            {this.props.organization.name}
          <h3>Photo</h3>
            Photo
          <h3>Description</h3>
            {this.props.organization.description}
          <h3>Link</h3>
            <a href={"http://"+this.props.organization.link}>{this.props.organization.link}</a>
          <h3>City</h3>
            {this.props.organization.city}
          <h3>State</h3>
            {this.props.organization.state}
          <h3>Email</h3>
            {this.props.organization.email}
          <h3>Contact Name</h3>
            {this.props.organization.contact_first_name} {this.props.organization.contact_last_name}
          <h3>Contact phone number</h3>
            {this.props.organization.contact_phone_number}
        </div>
      )
    }
  }
}
 export default Profile;

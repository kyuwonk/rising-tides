import React from "react";
import axios from 'axios';
 class Profile extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
      user: {},
      dataLoaded: false,
    }
  }
   componentDidMount() {
    axios.get('/users/' + this.props.user.id).then((data) => {
      this.setState({
        user: data,
        dataLoaded: true,
      })
    })
  }
   render() {
    const { user, dataLoaded } = this.state;
    let pageContent;
     if (!dataLoaded) {
      return (<div className="">Loading...</div>)
    } else {
      return (
        <div className="">
          <h2 className="">Volunteer Details</h2>
          <h3>Name</h3>
            {this.props.user.first_name} {this.props.user.last_name}
          <h3>Photo</h3>
            Photo
          <h3>Bio</h3>
            {this.props.user.bio}
          <h3>Link</h3>
            <a href={"http://"+this.props.user.link}>{this.props.user.link}</a>
          <h3>City</h3>
            {this.props.user.city}
          <h3>State</h3>
            {this.props.user.state}
          <h3>Skills</h3>
            {this.props.user.skills}
          <h3>Email</h3>
            {this.props.user.email}
          <h3>Phone number</h3>
            {this.props.user.phone_number}
        </div>
      )
    }
  }
}
 export default Profile;

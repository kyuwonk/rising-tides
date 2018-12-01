import React from "react"
import $ from "jquery"
import axios from "axios"
class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      city: "",
      state: "",
      link: "",
      skills: "",
      bio: "",
      selected_file: null,
      //TODO: change photo to be of appropriate type
      photo: "",
      formErrors: { firstName: "", lastName: "", email: "" },
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordMatch: false,
      formValid: false
    }

    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }
  }

  validateField = (fieldName, value) => {
    let formErrors = this.state.formErrors
    let firstNameValid = this.state.firstNameValid
    let lastNameValid = this.state.lastNameValid
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid
    let passwordMatch = this.state.passwordMatch
    switch (fieldName) {
      case "first_name":
        firstNameValid = value.length > 0
        formErrors.firstName = firstNameValid
          ? ""
          : " is not a valid first name"
        break
      case "last_name":
        lastNameValid = value.length > 0
        formErrors.lastName = lastNameValid
          ? ""
          : " is not a valid last name"
        break
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        formErrors.email = emailValid ? "" : " is an invalid email"
        break
      case "password":
        passwordValid = value.length >= 6
        formErrors.password = passwordValid ? "" : " is too short"
        break
      case "password_confirmation":
        passwordMatch = value.match(this.state.password)
        formErrors.password = passwordMatch ? "" : " does not match"
        break
      default:
        break
    }
    this.setState(
      {
        formErrors: formErrors,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        passwordMatch: passwordMatch
      },
      this.validateForm
    )
  }

  validateForm = () => {
    this.setState({
      formValid:
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordMatch
    })
  }

  handleFileChange = (e) => {
    this.setState({ selected_file: e.target.files[0] })
  }

  handleUpload = () => {
    const formData = new FormData()
    formData.append(
      "myFile",
      this.state.selected_file,
      this.state.selected_file.name
    )
    //TODO: post photo to correct domain
    axios.post("my-domain.com/file-upload", formData)
  }

  handleChange = name => event => {
    const value = event.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }

  handleRegistration = (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      city: this.state.city,
      state: this.state.state,
      link: this.state.link,
      bio: this.state.bio,
      skills: this.state.skills,
      phone_number: this.state.phone_number
    }
    axios
      .post("/users", {
        user: data
      })
      .then(function(response) {
        window.location = "/"
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {Object.keys(this.state.formErrors).map((fieldName, i) => {
              if (this.state.formErrors[fieldName].length > 0) {
                return (
                  <p key={i}>
                    {fieldName} {this.state.formErrors[fieldName]}
                  </p>
                )
              } else {
                return ""
              }
            })}
          </div>
        </div>
        <form>
          <fieldset>
            <label htmlFor="first_name">
              First Name (required)
            </label> <br/>
            <input
              type="text"
              placeholder="ie. John"
              value={this.state.first_name}
              id="first_name"
              onChange={this.handleChange("first_name")}
            /> <br/>
            <label htmlFor="last_name">
              Last Name (required)
            </label> <br/>
            <input
              type="text"
              placeholder="ie. Doe"
              value={this.state.last_name}
              id="last_name"
              onChange={this.handleChange("last_name")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">
              Email (required)
            </label> <br/>
            <input
              type="text"
              placeholder="ie. johndoe@email.com"
              value={this.state.email}
              id="email"
              onChange={this.handleChange("email")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">
              Password (required, 6 characters minimum)
            </label> <br/>
            <input
              type="password"
              placeholder="ie. password123"
              value={this.state.password}
              id="password"
              onChange={this.handleChange("password")}
            /> <br/>
            <label
              htmlFor="password_confirmation"
            >
              Confirm password
            </label> <br/>
            <input
              type="password"
              placeholder="ie. password123"
              value={this.state.password_confirmation}
              id="password_confirmation"
              onChange={this.handleChange("password_confirmation")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone_number">
              Phone number
            </label> <br/>
            <input
              type="text"
              placeholder="ie. (123)456-7890"
              value={this.state.phone_number}
              id="phone_number"
              onChange={this.handleChange("phone_number")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="city">
              City
            </label> <br/>
            <input
              type="text"
              placeholder="ie. San Francisco"
              value={this.state.city}
              id="city"
              onChange={this.handleChange("city")}
            /> <br/>
            <label htmlFor="state">
              State (abbreviation)
            </label> <br/>
            <input
              type="text"
              placeholder="ie. CA"
              value={this.state.state}
              id="state"
              onChange={this.handleChange("state")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">
              Link
            </label> <br/>
            <input
              type="text"
              placeholder="ie. linkedin.com/in/john-doe/"
              value={this.state.link}
              id="link"
              onChange={this.handleChange("link")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="skills">
              Skills
            </label> <br/>
            <textarea
              placeholder="ie. Software Development"
              value={this.state.skills}
              name="skills"
              rows="6"
              cols="50"
              onChange={this.handleChange("skills")}
              id="skills"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="bio">
              Bio
            </label> <br/>
            <textarea
              placeholder="Tell us about yourself!"
              value={this.state.bio}
              rows="6"
              cols="50"
              onChange={this.handleChange("bio")}
              id="bio"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="photo">
              Photo
            </label> <br/>
            <input type="file" onChange={this.handleFileChange} />
            <button onClick={this.handleUpload}>Upload!</button>
          </fieldset>
        </form>
        <fieldset>
          <button
            type="submit"
            value="Next Step"
            disabled={!this.state.formValid}
            onClick={this.handleRegistration}
          >
            Complete volunteer registration!
          </button>
        </fieldset>
      </div>
    )
  }
}
export default RegisterForm

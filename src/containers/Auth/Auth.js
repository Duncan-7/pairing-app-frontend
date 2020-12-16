import { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import axios from '../../axios-instance';

class Auth extends Component {
  state = {
    isSignUp: false,
    error: false,
    username: "",
    email: "",
    password: ""
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmitHander = (event) => {
    event.preventDefault();
    
    if(this.state.isSignUp) {
      //all the names are mixed up to make backend work, sorry
      const body = {
        fullName: this.state.username,
        username: this.state.email,
        password: this.state.password,
        active: false,
        profileComplete: false
      };
      this.sendSignupRequest(body);
    } else {
      const body = {
        username: this.state.email,
        password: this.state.password
      };
      this.sendLoginRequest(body);
    }
  }

  sendSignupRequest = (body) => {
    const url = '/users/sign-up';
    axios.post(url, body)
      .then(response => {
        console.log("User created")
        this.sendLoginRequest(body)
      })
  }

  sendLoginRequest = (body) => {
    const url = '/login';
    axios.post(url, body)
      .then(response => {
        const jwt = response.headers.authorization.split(" ")[1];
        console.log(jwt);
        const id = response.data
        let config = {
          headers: {
            "Authorization": "Bearer " + jwt,
          }
        }
        axios.get('/users/' + id, config)
          .then(response => {
            const user = response.data;
            this.props.saveCredentials(jwt, user);
          })
        
      })
  }

  toggleAuthMode = () => {
    let currentAuthMode = this.state.isSignUp;
    this.setState({
      isSignUp: !currentAuthMode
    })
  }

  render() {
    let form = <form onSubmit={this.onSubmitHander}> 
    <input 
      type="text" 
      placeholder="Username" 
      name="email" 
      onChange={(event) => this.onChangeHandler(event)}/>
    <input 
      type="password" 
      placeholder="Password" 
      name="password" 
      onChange={(event) => this.onChangeHandler(event)} />
    <Button btnType="Success">
      {this.state.isSignUp ? "Create Account" : "Log In"}
    </Button><br/>
  </form>

  if (this.state.isSignUp) {
    form = <form onSubmit={this.onSubmitHander}> 
          <input 
            type="text" 
            placeholder="Email" 
            name="email" 
            onChange={(event) => this.onChangeHandler(event)}/>
            <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={(event) => this.onChangeHandler(event)}/>
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={(event) => this.onChangeHandler(event)} />
          <Button btnType="Success">
            {this.state.isSignUp ? "Create Account" : "Log In"}
          </Button><br/>
        </form>
  }
    return(
      <div className={classes.Auth}>
        {form}
        <Button 
          btnType="Neutral" 
          clicked={this.toggleAuthMode}>
          {this.state.isSignUp ? 'Already Signed Up?' : 'Sign Up Now'}
        </Button>
      </div>
    )
  }
}

export default Auth;
import { Component } from 'react';
import axios from '../../axios-instance';
import classes from './Profile.module.css';
import Button from '../../components/UI/Button/Button';

class Profile extends Component {
  state = {}

  handleInputChange = (event) => {
    console.log(event)
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const body = this.state;
    console.log(body)
    axios.post('/languages', body)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    return(
      <form onSubmit={this.submitHandler}>
        <input type="checkbox" id="java" name="java" value="java" onChange={this.handleInputChange}/>
        <label htmlFor="java">Java</label><br />
        <input type="checkbox" id="python" name="python" value="python" onChange={this.handleInputChange}/>
        <label htmlFor="java">python</label><br />
        <input type="checkbox" id="ruby" name="ruby" value="ruby" onChange={this.handleInputChange}/>
        <label htmlFor="java">Ruby</label><br />
        <input type="checkbox" id="javaScript" name="javaScript" value="javaScript" onChange={this.handleInputChange}/>
        <label htmlFor="java">JavaScript</label><br />
        <Button btnType="Success">Submit</Button>
      </form>
    )
  }
}

export default Profile;
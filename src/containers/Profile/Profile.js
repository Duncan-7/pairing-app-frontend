import { Component } from 'react';
import axios from '../../axios-instance';
import classes from './Profile.module.css';
import Button from '../../components/UI/Button/Button';

class Profile extends Component {
  state = {
    
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const body = this.state;
    //remove any entries that have been created with no interest
    for(let language in body) {
      if(body[language] === '0') {
        delete body[language];
      }
    }
    console.log(body)
    axios.post('/languagepreferences', body)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    //add more languages here to add to the form
    const languages = ["java", "python", "ruby", "javascript", "C#", "C", "PHP", "swift", "go"];

    //make each language into a select input
    let languageInputs = languages.map(language => {
      return <div>
        <label htmlFor={language}>{language}:</label>
        <select name={language} id={language} onChange={this.handleInputChange}>
          <option value="0">Not Interested</option>
          <option value="1">Beginner</option>
          <option value="2">Intermediate</option>
          <option value="3">Advanced</option>
        </select>
      </div>
    })
    return(
      <div>
        {/* <form onSubmit={this.submitHandler}>
          <input type="checkbox" id="java" name="java" value="java" onChange={this.handleInputChange}/>
          <label htmlFor="java">Java</label><br />
          <input type="checkbox" id="python" name="python" value="python" onChange={this.handleInputChange}/>
          <label htmlFor="java">python</label><br />
          <input type="checkbox" id="ruby" name="ruby" value="ruby" onChange={this.handleInputChange}/>
          <label htmlFor="java">Ruby</label><br />
          <input type="checkbox" id="javaScript" name="javaScript" value="javaScript" onChange={this.handleInputChange}/>
          <label htmlFor="java">JavaScript</label><br />
          <Button btnType="Success">Submit</Button>
        </form> */}

        <form onSubmit={this.submitHandler}>
        {languageInputs}
        <Button btnType="Success">Submit</Button>
        </form>
      </div>
    )
  }
}

export default Profile;
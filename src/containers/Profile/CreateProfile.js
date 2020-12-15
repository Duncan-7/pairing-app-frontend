import { Component } from 'react';
import axios from '../../axios-instance';
import Button from '../../components/UI/Button/Button';

class CreateProfile extends Component {
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

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
    axios.post('/profile/' + this.props.user.id, body)
      .then(response => {
        console.log(response)
        const updatedUser = response.data
        /////////
        this.props.saveUser(updatedUser)
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
        <form onSubmit={this.submitHandler}>
        <input 
        type="text" 
        placeholder="Your github link" 
        name="github" 
        onChange={(event) => this.handleInputChange(event)}
        />
        {languageInputs}
        <Button btnType="Success">Submit</Button>
        </form>
      </div>
    )
  }
}

export default CreateProfile;
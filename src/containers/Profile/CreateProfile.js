import { Component } from 'react';
import classes from './Profile.module.css';
import axios from '../../axios-instance';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class CreateProfile extends Component {
  state = {
    languages: null
  }

  componentDidMount() {
    this.getLanguages();
  }

  getLanguages = () => {
    axios.get('/languages')
      .then(response => {
        const languageArray = response.data;
        this.setState({
          languages: languageArray
        })
      })
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
    //remove languages array
    delete body["languages"]
    console.log(body)
    axios.post('/profile/' + this.props.user.id, body)
      .then(response => {
        console.log(response)
        const updatedUser = response.data
        /////////
        this.props.saveUser(updatedUser)
        this.props.setUser();
      })
  }

  render() {
    let languageInputs = <Spinner />;

    if(this.state.languages) {
      //make each language into a select input
      languageInputs = this.state.languages.map(language => {
        return <div key={language.id}>
          <label className={classes.LanguageLabel} htmlFor={language.name}>{language.name}:</label>
          <select name={language.name} id={language.name} onChange={this.handleInputChange}>
            <option value="0">Not Interested</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </select>
        </div>
      })
    }
    

    return(
      <div>
        <h3>Please complete your user profile to be eligible for pairing!</h3>
        <form onSubmit={this.submitHandler}>
        <p>Github is a great place to store your code, so others can see what kind of projects you've been working on.</p>
        <p>Enter your link below, or open a free account here: <a href="https://github.com/">Github</a></p>
        <input 
        type="text" 
        placeholder="Your github link" 
        name="github" 
        onChange={(event) => this.handleInputChange(event)}
        />
        <p>Let us know your interest and experience levels:</p>
        {languageInputs}
        <Button btnType="Success">Submit</Button>
        </form>
      </div>
    )
  }
}

export default CreateProfile;
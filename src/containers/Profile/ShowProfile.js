import { Component } from 'react';
import axios from '../../axios-instance';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import LanguagePreference from './LanguagePreference';

class ShowProfile extends Component {
  state = {
    languagePreferences: null
  }

  componentDidMount = () => {
    this.getLanguagePreferences();
  }

  toggleActive = () => {
    const active = this.props.user.active;
    const body = {
      active: !active
    }
    axios.post('/profile/toggle-active/' + this.props.user.id, body)
      .then(response => {
        console.log(response)
        const updatedUser = response.data; 
        this.props.saveUser(updatedUser);
        this.props.updateUser();
      })
  }

  getLanguagePreferences = () => {
    axios.get('/languagepreferences/' + this.props.user.id)
      .then(response => {
        console.log(response);
        const languagePreferences = response.data;
        this.setState({
          languagePreferences: languagePreferences
        })
      })
  }

  render() {
    let languagePreferences = <Spinner />
    if(this.state.languagePreferences) {
      languagePreferences = this.state.languagePreferences.map(languagePreference => {
        return <LanguagePreference
                  key={languagePreference.id}
                  language={languagePreference.language.name}
                  skill={languagePreference.skill} />
      })
    }

    let toggleButton = null;
    if(this.props.isCurrentUser) {
      toggleButton = <Button btnType="Neutral" clicked={this.toggleActive}>
      {this.props.user.active ? "Become Inactive" : "Become Active"}
    </Button>
    }
    return(
      <div>
        <h2> {this.props.user.fullName}'s Profile</h2><br></br>

        <p><strong>Github: </strong><a href={this.props.user.github} target="_blank">{this.props.user.fullName}'s Github</a></p>

        <p><strong>Languages:</strong></p>
        {languagePreferences}

        {toggleButton}
      </div>
    )

  }
}

export default ShowProfile;
import { Component } from 'react';
import axios from '../../axios-instance';
import Button from '../../components/UI/Button/Button';

class ShowProfile extends Component {
  state = {

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
      })
  }

  // getLanguages = () => {
  //   axios.get('/languagepreferences')
  //     .then(response => {
  //       console.log(response);
  //     })
  // }

  render() {

    return(
      <div>
        <h1> {this.props.user.fullName}'s Profile</h1><br></br>

        <strong>Github: </strong><a href={this.props.user.github}>{this.props.user.fullName}'s Github</a><br></br>

        <strong>Languages:</strong> 

        <br></br><Button btnType="Neutral" clicked={this.toggleActive}>
          {this.props.user.active ? "Become Inactive" : "Become Active"}
        </Button>
      </div>
    )

  }
}

export default ShowProfile;
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

  render() {

    return(
      <div>
        COMPLETED PROFILE M8!
        <Button btnType="Neutral" clicked={this.toggleActive}>
          {this.props.user.active ? "Become Inactive" : "Become Active"}
        </Button>
      </div>
    )

  }
}

export default ShowProfile;
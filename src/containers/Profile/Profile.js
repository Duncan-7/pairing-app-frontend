import { Component } from 'react';
import axios from '../../axios-instance';
import classes from './Profile.module.css';
import Button from '../../components/UI/Button/Button';
import CreateProfile from './CreateProfile';
import ShowProfile from './ShowProfile';

class Profile extends Component {
  state = {
    
  }

  render() {
   let profile = null;


    if (this.props.current_user.profileComplete){
      profile = <ShowProfile user={this.props.current_user} saveUser={this.props.saveUser} />
    } else {
      profile = <CreateProfile user={this.props.current_user} saveUser={this.props.saveUser}/>
    }


    return(
      <div>
        {profile}
      </div>
    )
  }
}

export default Profile;
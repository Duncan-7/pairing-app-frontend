import { Component } from 'react';
import axios from '../../axios-instance';
import CreateProfile from './CreateProfile';
import ShowProfile from './ShowProfile';

class Profile extends Component {
  state = {
    user: null,
    isCurrentUser: null
  }

  componentDidMount() {
    this.setUser();
  }

  setUser = () => {
    console.log(this.props.match.params.id)
    console.log(this.props.current_user.id)
    //if user is viewing their own profile, use details already stored in app
    if(this.props.match.params.id == this.props.current_user.id) {
      this.setState({
        user: this.props.current_user,
        isCurrentUser: true
      })
    } else {
      axios.get('/users/' + this.props.match.params.id)
        .then(response => {
          console.log(response)
          const user = response.data;
          this.setState({
            user: user,
            isCurrentUser: false
          })
        })
    }
    //otherwise send request to get user details
  }

  render() {
    let profile = null;

    if(this.state.user) {
      if (this.state.user.profileComplete){
        profile = <ShowProfile
                    user={this.state.user}
                    isCurrentUser={this.state.isCurrentUser}
                    saveUser={this.props.saveUser}
                    updateUser={this.setUser}/>
      } else if(!this.state.user.profileComplete && this.state.isCurrentUser) {
        profile = <CreateProfile user={this.state.user} saveUser={this.props.saveUser} setUser={this.setUser}/>
      } else {
        profile = <p>This user has not completed their profile, please try again later.</p>
      }
    }
    


    return(
      <div>
        {profile}
      </div>
    )
  }
}

export default Profile;
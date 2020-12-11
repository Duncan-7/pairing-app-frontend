import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/Spinner/Spinner';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import Matches from './containers/Matches/Matches';

import './App.css';
import Home from './components/Home/Home';
import Profile from './containers/Profile/Profile';
import axios from './axios-instance';

class App extends Component {
  state = {
    jwt: null,
    loaded: false
  }

  componentDidMount() {
    //check if we have jwt and user details stored already
    this.checkCredentials();
  }
  
  //save JWT and user details in local storage on login
  saveCredentials = (jwt, user) => {
    this.setState({
      jwt: jwt,
      user: user
    })
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    this.setAxiosInterceptor(jwt);
  }

  //on startup check if there are saved credentials
  checkCredentials = () => {
    const jwt = localStorage.getItem('jwt');
    const user = JSON.parse(localStorage.getItem('user'))
    if(jwt != null && user != null) {
      this.setAxiosInterceptor(jwt);
      this.setState({
        jwt: jwt,
        user: user
      })
    }
    this.setState({
      loaded: true
    })
  }

  setAxiosInterceptor = (jwt) => {
    axios.interceptors.request.use(config => {
      config.headers.authorization = `Bearer ${jwt}`;
      return config;
    },
      error => Promise.reject(error)
    );
  }

  testJWT = () => {
    // let config = {
    //   headers: {
    //     'Authorization': 'Bearer ' + this.state.jwt
    //   }
    // }
    axios.get('/test')
      .then(response => {
        console.log(response);
      })
  }

  logout = () => {
    this.setState({
      jwt: null
    })
    localStorage.clear();
  }

  render() {
    let routes = <Spinner />
    if(this.state.loaded) {
      routes = (
        <Switch>
          <Route path="/auth" render={(props) => <Auth 
                                                    {...props} 
                                                    saveCredentials={this.saveCredentials}/>} />
          <Redirect to="/auth" />
        </Switch>
      )
    }

    if (this.state.jwt) {
      routes = (
        <Switch>
          <Route path="/logout" render={(props) => <Logout {...props} onLogout={this.logout} />} />
          <Route path="/matches" render={(props) => <Matches {...props} current_user={this.state.user} jwt={this.state.jwt}/>} />
          <Route path="/profile" render={(props) => <Profile {...props} current_user={this.state.user} />} />
          <Route path="/" exact render={(props) => <Home {...props} testJWT={this.testJWT} current_user={this.state.user} />} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout isAuth={!!this.state.jwt}>
        <div className="App">
          {routes}
        </div>
      </Layout>
    );
  }
}

export default App;

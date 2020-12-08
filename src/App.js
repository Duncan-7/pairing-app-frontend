import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/Spinner/Spinner';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';

import './App.css';
import Home from './components/Home/Home';
import axios from 'axios';

class App extends Component {
  state = {
    jwt: null,
    loaded: false
  }

  componentDidMount() {
    this.checkJWT();
  }

  saveJWT = (jwt) => {
    this.setState({
      jwt: jwt
    })
    localStorage.setItem('jwt', jwt);
    console.log(localStorage.getItem('jwt'))
  }

  checkJWT = () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt != null) {
      this.setState({
        jwt: jwt
      })
    }
    this.setState({
      loaded: true
    })
  }

  testJWT = () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      }
    }
    axios.get('http://localhost:8080/test', config)
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
                                                    tempLogin={this.login} 
                                                    saveJWT={this.saveJWT}/>} />
          <Redirect to="/auth" />
        </Switch>
      )
    }

    if (this.state.jwt) {
      routes = (
        <Switch>
          <Route path="/logout" render={(props) => <Logout {...props} onLogout={this.logout} />} />
          <Route path="/" exact render={(props) => <Home {...props} testJWT={this.testJWT} />} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        <div className="App">
          {routes}
        </div>
      </Layout>
    );
  }
}

export default App;

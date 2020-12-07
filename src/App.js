import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';

import './App.css';
import Home from './components/Home/Home';

class App extends Component {
  state = {
    authenticated: false
  }

  logout = () => {
    this.setState({
      authenticated: false
    })
  }

  login = () => {
    this.setState({
      authenticated: true
    })
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} tempLogin={this.login} />} />
        <Redirect to="/auth" />
      </Switch>
    )

    if (this.state.authenticated) {
      routes = (
        <Switch>
          <Route path="/logout" render={(props) => <Logout {...props} onLogout={this.logout} />} />
          <Route path="/clients/:id/edit" render={(props) => <Auth {...props} isSignUp={true} isEdit={true} />} />
          <Route path="/" exact component={Home} />
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

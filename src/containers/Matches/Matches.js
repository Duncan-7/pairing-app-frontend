import { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import Match from './Match/Match';
import axios from '../../axios-instance';

class Matches extends Component {
  state = {
    matches: null,
    loaded: false
  }

  componentDidMount() {
    this.getMatches();
  }

  getMatches = () => {
    const url = '/matches';
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({
          matches: response.data,
          loaded: true
        })
      })
  }

  createMatches = () => {
    const url = '/matches';
    let body = {}
    axios.post(url, body)
      .then(response => {
        console.log(response);
      })
  }


  render() {
    let matches = <Spinner />
    if (this.state.loaded) {
      matches = this.state.matches.map(match => {
        return <Match 
                  key={match.id}
                  user1={match.user1}
                  user2={match.user2}
                  startTime={match.start_time} />
      })
    }
    return(
      <Aux>
        <Button btnType="Neutral" clicked={this.createMatches}>Make Matches</Button>
        {matches}
      </Aux>
    )
  }
}

export default Matches;
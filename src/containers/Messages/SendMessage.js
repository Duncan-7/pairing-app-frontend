import { Component } from 'react';
import classes from './SendMessage.module.css';
import axios from '../../axios-instance';
import Button from '../../components/UI/Button/Button';

class SendMessage extends Component {
  state = {
    content: "",
  }

  onChangeHandler = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.content);
    const body = {
      sender_id: this.props.sender.id,
      receiver_id: this.props.receiver.id,
      content: this.state.content
    }
    axios.post("/messages", body)
      .then(response => {
        console.log(response);
        this.setState({
          content: ""
        })
        this.props.getMessages();
      })
  }

  submitFromKeyboard = (event) => {
    if(event.keyCode === 13) {
      this.submitHandler(event);
    }
  }

  render() {
    return <form className={classes.Form} onSubmit={this.submitHandler}>
      <textarea 
        className={classes.Send} 
        onChange={this.onChangeHandler} 
        value={this.state.content}
        onKeyDown={this.submitFromKeyboard}></textarea>
      <Button btnType="Success">Send</Button>
    </form>
  }
}

export default SendMessage;
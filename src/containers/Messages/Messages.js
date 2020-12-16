import { Component } from 'react';
import axios from '../../axios-instance';
import classes from './Messages.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import SendMessage from './SendMessage';
import Conversation from './Conversation';
import Message from './Message';

class Messages extends Component {
  state = {
    conversations: null,
    showConversation: null,
    loaded: false
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages = () => {
    axios.get('/messages/' + this.props.current_user.id)
    .then(response => {
      const messages = response.data;
      this.formConversations(messages);
    })
  }
  //filter all messages into conversations with other users
  formConversations = (messages) => {
    const conversations = {};
    const currentUserId = this.props.current_user.id;
    messages.forEach(message => {
      //get the id of the other user involved in the message, whether sender or receiver
      let otherUserId = currentUserId === message.sender.id ? message.receiver.id : message.sender.id;
      //if the conversation doesn't exist yet, create it in the converstations object with key equal to otherUserId
      if (conversations[otherUserId] === undefined) {
        //initialise as an empty array, then push relevant messages into it
        conversations[otherUserId] = [];
      }
      conversations[otherUserId].push(message);
    })
    const conversationsArray = Object.values(conversations);
    this.setState({
      conversations: conversationsArray,
      loaded: true
    })
  }

  selectConversation = (index) => {
    this.setState({
      showConversation: index
    })
    this.markAsRead(index);
  }

  markAsRead = (index) => {
    let messages = this.state.conversations[index]
    let unreadMessages = messages.filter(message => {
      return message.viewed === false && message.receiver.id === this.props.current_user.id
    });
    const body = {
      unreadMessages: unreadMessages
    }
    if(unreadMessages.length > 0) {
      axios.post('/messages/unread', body)
      .then(response => {
        console.log(response);
        this.getMessages();
      })
    }
  }

  render() {
    let conversations = <Spinner />
    if (this.state.loaded) {
      conversations = this.state.conversations.map((conversation, index) => {
        let newMessages = false;
        conversation.forEach(message => {
          if (!message.viewed && message.receiver.id === this.props.current_user.id) {
            newMessages = true;
          }
        })
        return <Conversation
                  key={index}
                  messages={conversation} 
                  user={this.props.current_user} 
                  selectConversation={() => this.selectConversation(index)} 
                  selected={this.state.showConversation === index}
                  newMessages={newMessages}/>
      })
    }
    let messageForm = null;
    let messages = null;
    if(this.state.showConversation !== null) {
      messages = this.state.conversations[this.state.showConversation]
      messages = messages.sort((a,b) => {
        let aDate = new Date(a.time_sent);
        let bDate = new Date(b.time_sent);
        return aDate - bDate;
      })
      messages = this.state.conversations[this.state.showConversation].map(message => {
        return <Message
                  key={message.id}
                  message={message}
                  user={this.props.current_user}
                  sender={this.props.current_user.id === message.sender.id}/>
      })
      messageForm = <SendMessage
        sender={this.props.current_user}
        receiver={this.state.conversations[this.state.showConversation][0].sender.id === this.props.current_user.id ? this.state.conversations[this.state.showConversation][0].receiver : this.state.conversations[this.state.showConversation][0].sender}
        getMessages={this.getMessages}/>
    }

    return (
      <div className={classes.Container}>
        <div className={classes.ConversationContainer}>
          <h3>Conversations</h3>
          {conversations}
        </div>
        <div className={classes.MessageContainer}>
          
          {messages}
          {messageForm}
        </div>
      </div>
    )
  }
}

export default Messages
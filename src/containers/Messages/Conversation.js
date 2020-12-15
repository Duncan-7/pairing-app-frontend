import classes from './Conversation.module.css';

const Conversation = (props) => {
  const conversationClasses = [classes.Conversation]
  if(props.selected) {
    conversationClasses.push(classes.Selected)
  }

  return <div 
          onClick={props.selectConversation}
          className={conversationClasses.join(" ")}>
            {props.messages[0].sender.id === props.user.id ? props.messages[0].receiver.fullName : props.messages[0].sender.fullName}
            <span hidden={!props.newMessages} className={classes.New}>new</span>
        </div>
}

export default Conversation;
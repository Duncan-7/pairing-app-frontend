import classes from './Message.module.css';
import moment from 'moment';

const Message = (props) => {
  const messageClasses = [classes.Message]
  if(props.sender) {
    messageClasses.push(classes.Sender)
  } else {
    messageClasses.push(classes.Receiver)
  }

  return <div className={messageClasses.join(" ")}>
      {props.message.content}
      <div className={classes.Timestamp}>{moment(props.message.time_sent).fromNow()}</div>
    </div>
}

export default Message;
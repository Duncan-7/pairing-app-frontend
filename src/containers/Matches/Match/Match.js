import classes from "./Match.module.css"
import Button from '../../../components/UI/Button/Button';
import { NavLink } from 'react-router-dom';


const Match = (props) => {
  let language = props.language
  language = language.charAt(0).toUpperCase() + language.slice(1)

  return <div className={classes.matchContainer}>
    <p><strong>User 1:</strong> <NavLink to={'/profile/' + props.user1.id}>{props.user1.fullName}</NavLink></p>
    <p><strong>User 2:</strong> <NavLink to={'/profile/' + props.user2.id}>{props.user2.fullName}</NavLink></p>
    <p><strong>Language:</strong> {language}</p>
    <p><strong>Week Commencing:</strong> {props.startTime}</p>
    <p>You've been matched! Go ahead and message your pair to arrange a time for your session.</p>
    <p>Click the button below when your session is complete!</p>
    <NavLink to={'/messages'}><Button btnType="Neutral">Message</Button></NavLink>
    <Button 
      btnType="Success" 
      disabled={props.complete}
      clicked={() => props.completeMatch(props.id)}>{props.complete ? "Completed" : "Complete"}</Button>
  </div>
}

export default Match;
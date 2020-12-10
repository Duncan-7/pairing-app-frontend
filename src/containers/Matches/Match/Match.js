import classes from "./Match.module.css"

const Match = (props) => {
  
  return <div className={classes.matchContainer}>
    <p>Match between {props.user1.username} and {props.user2.username} at {props.startTime}</p>
  </div>
}

export default Match;
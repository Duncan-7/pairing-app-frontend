import Button from '../UI/Button/Button';

const Home = (props) => {
  return (
    <div>
      <h3>Welcome to *insert pair based pun here*, {props.current_user.fullName}.</h3>
      <p>Some text telling everyone how cool our website is.</p>
      <Button btnType="Neutral" clicked={props.testJWT}>Test Authentication</Button>
    </div>
  )
}

export default Home;
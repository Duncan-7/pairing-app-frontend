import classes from './Toolbar.module.css'
import NavigationLinks from '../NavigationLinks/NavigationLinks'

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <nav>
      <NavigationLinks isAuth={true} userId={props.userId} />
    </nav>
  </header>
)

export default Toolbar;
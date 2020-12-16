import React from 'react';
import NavigationLink from './NavigationLink/NavigationLink';
import classes from './NavigationLinks.module.css';

const NavigationLinks = (props) => {
  let authLinks = <ul className={classes.NavLinks}>
    <NavigationLink link="/" exact>Home</NavigationLink>
  </ul>
  if (props.isAuth) {
    authLinks = <ul className={classes.NavLinks}>
      <NavigationLink link="/" exact>Home</NavigationLink>
      <NavigationLink link={"/profile/" + props.userId}>Profile</NavigationLink>
      <NavigationLink link="/matches">Matches</NavigationLink>
      <NavigationLink link="/messages">Messages</NavigationLink>
      <NavigationLink link="/logout">Logout</NavigationLink>
    </ul>
  }

  return (
    <div className={classes.NavBar}>
      {authLinks}
    </div>
  )
}

export default NavigationLinks;
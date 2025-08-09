import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css'

export default function Navigation() {
  return (<>
  <header className={classes.header}>
    <nav>
      <ul className={classes.list}>
      <li><NavLink className={
        ({isActive}) => isActive ? classes.active: ''
      } to="/">Home</NavLink></li>
      <li><NavLink className={
        ({isActive}) => isActive ? classes.active: ''
      } style={
        ({isActive}) => ({backgroundColor: isActive ? 'red' : ''})
      } to="/products">Products</NavLink></li>
      </ul>
    </nav>
</header>
  </>);
}
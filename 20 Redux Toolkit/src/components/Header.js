import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { AuthActions } from '../store/auth-slice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  function handleLogout() {
    dispatch(AuthActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          {isAuthenticated && (<>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          </>)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

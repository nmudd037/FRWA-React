import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { logout, useAuth } from '../../context/auth/AuthState';
import { clearFrwa, useFrwa } from '../../context/frwa/FrwaState';

const Navigation = () => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;

  // we just need the frwa dispatch without state.
  const frwaDispatch = useFrwa()[1];

  const onLogout = () => {
    logout(authDispatch);
    clearFrwa(frwaDispatch);
  };

  const guestLinks = (
    <Fragment>
      <p className="f3 link dim underline pa3 pointer navy fw6">
        <Link to="/signin">Sign In</Link>
      </p>
      <p className="f3 link dim black underline pa3 pointer navy fw6">
        <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <p className="f3 link dim black underline pa3 pointer navy fw6">
        <a href="/signin" onClick={onLogout}>
          Sign Out
        </a>
      </p>
    </Fragment>
  );

  return <nav className="flex justify-end">{isAuthenticated ? authLinks : guestLinks}</nav>;
};

export default Navigation;

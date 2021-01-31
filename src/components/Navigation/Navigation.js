/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Navigation = ({ isSignedIn, onRouteChange }) => {
  if (!isSignedIn) {
    return (
      <nav className="flex justify-end">
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim underline pa3 pointer navy fw6"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black underline pa3 pointer navy fw6"
        >
          Register
        </p>
      </nav>
    );
  }
  return (
    <nav className="flex justify-end">
      <p
        onClick={() => onRouteChange('signout')}
        className="f3 link dim black underline pa3 pointer navy fw6"
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import './SignIn.css';

import React, { useEffect, useState } from 'react';

import Form from '../Form/Form';

function SignIn({ onRouteChange, loadUser, alertGenerator }) {
  const [formLabel, setFormLabel] = useState('');

  useEffect(() => {
    setFormLabel('signin');
  }, []);
  return (
    <Form
      onRouteChange={onRouteChange}
      formLabel={formLabel}
      loadUser={loadUser}
      alertGenerator={alertGenerator}
    />
  );
}

export default SignIn;

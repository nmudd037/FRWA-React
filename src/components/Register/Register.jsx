import { useContext, useEffect, useState } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, useAuth } from '../../context/auth/AuthState';
import Form from '../Form/Form';

const Register = (props) => {
  const { alertGenerator } = useContext(AlertContext);

  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, error } = authState;

  const [formLabel, setFormLabel] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      alertGenerator('error', error);
      clearErrors(authDispatch);
    }

    setFormLabel('register');
  }, [alertGenerator, error, props.history, authDispatch, isAuthenticated]);

  return <Form formLabel={formLabel} />;
};

export default Register;

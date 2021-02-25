import { useEffect, useState } from 'react';

import { useAuth } from '../../context/auth/AuthState';
import Form from '../Form/Form';

const SignIn = (props) => {
  // We just need auth state without dispatch
  const authState = useAuth()[0];
  const { isAuthenticated } = authState;

  const [formLabel, setFormLabel] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    setFormLabel('signin');
  }, [props.history, isAuthenticated]);

  return <Form formLabel={formLabel} />;
};

export default SignIn;

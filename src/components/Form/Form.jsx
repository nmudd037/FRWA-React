import './Form.css';

import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, login, register, useAuth } from '../../context/auth/AuthState';
import validateEmail from '../../utils/validateEmail';

const Form = ({ formLabel }) => {
  const { alertGenerator } = useContext(AlertContext);

  const [authState, authDispatch] = useAuth();

  const { error } = authState;

  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (error) {
      alertGenerator('error', error);
      clearErrors(authDispatch);
    }
  }, [error, alertGenerator, authDispatch]);

  const { name, email, password, passwordConfirm } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitSignIn = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      return alertGenerator('error', 'Please provide email and password to sign in');
    }

    if (!validateEmail(email)) {
      return alertGenerator('error', 'Please enter a valid email and domain');
    }

    login(authDispatch, { email, password });
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      return alertGenerator('error', 'Please provide name, email and password to register');
    } else if (!validateEmail(email)) {
      return alertGenerator('error', 'Please enter a valid email and domain');
    } else if (password !== passwordConfirm) {
      return alertGenerator('error', 'Password and Confirm Password do not match');
    }

    register(authDispatch, { name, email, password });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure center"
          onSubmit={formLabel === 'register' ? onSubmitRegister : onSubmitSignIn}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 navy">
              {formLabel === 'register' ? 'Register' : 'Sign In'}
            </legend>
            {formLabel === 'register' ? (
              <div className="mt3">
                <label className="db fw7 lh-copy f4 navy" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba b--navy bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="your name..."
                  required
                  onChange={onChange}
                />
              </div>
            ) : (
              ''
            )}
            <div className="mt3">
              <label className="db fw7 lh-copy f4 navy" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba b--navy bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email-address"
                placeholder="you@example.com"
                required
                onChange={onChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw7 lh-copy f4 navy" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba b--navy bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                minLength="8"
                onChange={onChange}
              />
            </div>
            {formLabel === 'register' ? (
              <div className="mv3">
                <label className="db fw7 lh-copy f4 navy" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <input
                  className="b pa2 input-reset ba b--navy bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  onChange={onChange}
                />
              </div>
            ) : (
              ''
            )}
          </fieldset>
          <div className="mv3">
            <input
              className="b ph3 fw6 pv2 input-reset ba b--navy bg-transparent grow pointer f5 dib navy"
              type="submit"
              value={formLabel === 'register' ? 'Register' : 'Sign In'}
            />
          </div>
        </form>
      </main>
    </article>
  );
};

Form.propTypes = {
  formLabel: PropTypes.string.isRequired,
};

export default Form;

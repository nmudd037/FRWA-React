/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Form.css';

import React, { useEffect, useState } from 'react';

function Form({ formLabel, onRouteChange, loadUser, alertGenerator }) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const onNameChange = (event) => {
    setFormName(event.target.value);
  };

  const onEmailChange = (event) => {
    setFormEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setFormPassword(event.target.value);
  };

  const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const onSubmitSignIn = (event) => {
    event.preventDefault();

    if (!formEmail || !formPassword) {
      return alertGenerator('error', 'Please provide email and password to sign in');
    }

    if (!validateEmail(formEmail)) {
      return alertGenerator('error', 'Please provide a valid email address');
    }

    fetch('https://frwa-server-v2.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formEmail,
        password: formPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.data && user.tokenJWT) {
          //console.log(user);
          localStorage.setItem('token', user.tokenJWT);
          loadUser(user.data);
          onRouteChange('home');
          alertGenerator('success', 'Successfully Signed in');
        }
        if (Object.prototype.toString.call(user) === '[object String]') {
          // OR: (typeof user === 'string' || user instanceof String)
          return alertGenerator('error', user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitRegister = (event) => {
    event.preventDefault();

    if (!formName || !formEmail || !formPassword) {
      return alertGenerator('error', 'Please provide name, email and password to register');
    }

    if (!validateEmail(formEmail)) {
      return alertGenerator('error', 'Please provide a valid email address');
    }

    fetch('https://frwa-server-v2.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formName,
        email: formEmail,
        password: formPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        //console.log(user);
        if (user.data && user.tokenJWT) {
          localStorage.setItem('token', user.tokenJWT);
          loadUser(user.data);
          onRouteChange('home');
          alertGenerator('success', 'Successfully Registered');
        }
        if (Object.prototype.toString.call(user) === '[object String]') {
          // OR: (typeof user === 'string' || user instanceof String)
          return alertGenerator('error', user);
        }
      })
      .catch((err) => {
        alertGenerator('error', 'Something went wrong, please try again later!');
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure center">
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
                  onChange={onNameChange}
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
                name="email-address"
                id="email-address"
                placeholder="you@example.com"
                required
                onChange={onEmailChange}
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
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="mv3">
            <input
              onClick={formLabel === 'register' ? onSubmitRegister : onSubmitSignIn}
              className="b ph3 fw6 pv2 input-reset ba b--navy bg-transparent grow pointer f5 dib navy"
              type="submit"
              value={formLabel === 'register' ? 'Register' : 'Sign In'}
            />
          </div>
          {formLabel === 'signin' ? (
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                className="f5 fw6 link dim black db navy pointer"
              >
                Register
              </p>
            </div>
          ) : (
            ''
          )}
        </form>
      </main>
    </article>
  );
}

export default Form;

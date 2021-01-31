import './App.css';

//import Clarifai from 'clarifai';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Particles from 'react-particles-js';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Footer from './components/Footer/Footer';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

function App() {
  const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 700,
        },
      },
      color: {
        value: '#ef473a',
      },
      links: {
        color: '#ffffff',
        width: 1,
        opacity: 0.4,
      },
    },
  };

  const alert = useAlert();

  const alertGenerator = (type, message) => {
    switch (type) {
      case 'show':
        return alert.show(message);
      case 'error':
        return alert.error(message);
      case 'success':
        return alert.success(message);
      default:
        return alert.show(message);
    }
  };

  // const [input, setInput] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  // const [box, setBox] = useState([]);
  // const [route, setRoute] = useState('signin');
  // const [isSignedIn, setIsSignedIn] = useState(false);

  const initialState = {
    input: '',
    imageUrl: '',
    box: [],
    route: 'signin',
    isSignedIn: false,
    isToken: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    },
  };
  const [state, setState] = useState(initialState);

  const calculateFaceLocation = (data) => {
    const boundingBoxArray = data.outputs[0].data.regions.map(
      (regions) => regions.region_info.bounding_box
    );
    //console.log(boundingBoxArray);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    const boxArray = boundingBoxArray.map((box) => {
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - box.right_col * width,
        bottomRow: height - box.bottom_row * height,
      };
    });
    //console.log(boxArray);

    return boxArray;
  };

  const displayFaceBox = (box) => {
    setState((state) => ({ ...state, box: box }));
    //console.log(...box);
  };

  const onInputChange = (event) => {
    console.log(event.target.value);
    setState((state) => ({ ...state, input: event.target.value }));
  };

  const onPictureSubmit = () => {
    //console.log('click');
    setState((state) => ({ ...state, imageUrl: state.input }));
    fetch('https://frwa-server-v2.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://frwa-server-v2.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setState((state) => ({ ...state, user: { ...state.user, entries: count } }));
            });
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      localStorage.removeItem('token');
      setState((state) => ({ ...state, isSignedIn: false }));
      alertGenerator('success', 'Successfully Signed Out');
    } else if (route === 'home') {
      setState((state) => ({ ...state, isSignedIn: true }));
    }
    setState((state) => ({ ...state, route: route }));
  };

  const loadUser = (data) => {
    setState((state) => ({
      ...state,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    }));
  };

  // const onToken = (token) => {
  //   if (token) setState((state) => ({ ...state, isToken: true }));
  // };

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      return fetch('https://frwa-server-v2.herokuapp.com/profile', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            Object.prototype.toString.call(data) === '[object String]' &&
            data.includes('expired')
          ) {
            localStorage.removeItem('token');
            return setState(initialState);
          }
          setState((state) => ({ ...state, route: 'home', isSignedIn: true, isToken: true }));
          loadUser(data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isSignedIn, box, imageUrl, route, isToken } = state;
  const { name, entries } = state.user;

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
        alertGenerator={alertGenerator}
      />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank name={name} entries={entries} />
          <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : isToken ? (
        <></>
      ) : route === 'signin' || route === 'signout' ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} alertGenerator={alertGenerator} />
      ) : route === 'register' ? (
        <Register
          onRouteChange={onRouteChange}
          loadUser={loadUser}
          alertGenerator={alertGenerator}
        />
      ) : (
        <></>
      )}
      <Footer isSignedIn={isSignedIn} imageUrl={imageUrl} />
    </div>
  );
}

export default App;

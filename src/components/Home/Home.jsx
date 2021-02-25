import { Fragment } from 'react';

import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Logo from '../Logo/Logo';
import ProfileCard from '../ProfileCard/ProfileCard';

const Home = () => {
  return (
    <Fragment>
      <Logo />
      <ProfileCard />
      <FaceRecognition />
    </Fragment>
  );
};

export default Home;

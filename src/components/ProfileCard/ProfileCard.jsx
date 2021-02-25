import './ProfileCard.css';

import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-scroll';

import AlertContext from '../../context/alert/AlertContext';
import { updateUserImgEntries, useAuth } from '../../context/auth/AuthState';
import { clearFrwa, sendImage, updateEntries, useFrwa } from '../../context/frwa/FrwaState';
import validateUrl from '../../utils/validateUrl';
import Spinner from '../Spinner/Spinner';

const ProfileCard = () => {
  const { alertGenerator } = useContext(AlertContext);

  const [frwaState, frwaDispatch] = useFrwa();
  const { updatedEntries, error } = frwaState;

  const [authState, authDispatch] = useAuth();
  const { user } = authState;

  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    if (error) {
      alertGenerator('error', error);
      clearFrwa(frwaDispatch);
    }

    if (updatedEntries) {
      updateUserImgEntries(authDispatch, updatedEntries);
    }
  }, [error, alertGenerator, frwaDispatch, authDispatch, updatedEntries]);

  if (!user) {
    return <Spinner />;
  }

  const onInputChange = (e) => {
    setImageInput(e.target.value);
  };

  const onPictureSubmit = () => {
    if (!validateUrl(imageInput)) {
      return alertGenerator('error', 'Please provide a valid URL');
    }

    sendImage(frwaDispatch, { imageUrl: imageInput });

    updateEntries(frwaDispatch, id, { imageUrl: imageInput });
  };

  const { name, entries, id } = user;

  return (
    <Fragment>
      <div>
        <div className="f2 fw4 washed-yellow">{`${name}, your current FRWA search count is...`}</div>
        <div className="f1 washed-yellow">{`${entries}`}</div>
      </div>
      <div className="ma4 mt0">
        <p className="f3 navy fw6">
          {'The FRWA will detect faces in your pictures, Give it a try!!!'}
        </p>
        <div className="flex justify-center">
          <form className="pa4 br3 shadow-5 form" onSubmit={onPictureSubmit}>
            <input
              type="text"
              className="f4 pa2 w-70 center pointer bg navy fw6 mobi"
              placeholder="Enter the image url"
              onChange={onInputChange}
            />
            <Link to="imageContainer" smooth duration={1400}>
              <button
                className="w-30 grow f4 link br2 ph3 pv2 dib white bg-near-black pointer mobi"
                onClick={onPictureSubmit}
              >
                Detect
              </button>
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileCard;

import './ImageLinkForm.css';

import React from 'react';
import { Link } from 'react-scroll';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
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
  );
};

export default ImageLinkForm;

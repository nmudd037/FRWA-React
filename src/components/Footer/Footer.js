import './Footer.css';

import React from 'react';

const Footer = ({ isSignedIn, imageUrl }) => {
  return (
    <footer
      className={`pv4 ph3 ph5-m ph5-l navy fw6 flex justify-start ${
        isSignedIn && imageUrl ? 'footer' : ''
      }`}
    >
      <small className="f4 db tc">
        © {new Date().getFullYear()}
        <a href="https://github.com/nmudd037" className="ttu link dim pointer">
          {' '}
          MNR
        </a>
        ., All Rights Reserved
      </small>
    </footer>
  );
};
export default Footer;

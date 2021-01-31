import './Logo.css';

import React from 'react';
import Tilty from 'react-tilty';

import icon from './Logo.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilty
        className="Tilt br4 h3 w3 pointer"
        reverse
        axis="x"
        scale={1}
        perspective={900}
        reset={false}
      >
        <div className="Tilt-inner">
          <img src={icon} alt="Logo" className="pt2" />
        </div>
      </Tilty>
    </div>
  );
};

export default Logo;

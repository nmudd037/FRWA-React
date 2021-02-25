import './Footer.css';

import { useEffect, useState } from 'react';

import { useFrwa } from '../../context/frwa/FrwaState';

const Footer = () => {
  // We only need frwa state without dispatch
  const frwaState = useFrwa()[0];

  const { imageUrl } = frwaState;

  const [footerStyle, setFooterStyle] = useState({
    marginTop: '0px',
  });

  useEffect(() => {
    if (imageUrl) {
      const image = document.getElementById('inputImage');
      const height = Number(image.height);

      setFooterStyle({
        marginTop: `${height}px`,
      });
    }
  }, [imageUrl]);

  return (
    <footer className="pv4 ph3 ph5-m ph5-l navy fw6 flex justify-start" style={footerStyle}>
      <small className="f4 db tc">
        © {new Date().getFullYear()}
        <a
          href="https://github.com/nmudd037"
          className="ttu link dim pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          MNR
        </a>
        ., All Rights Reserved
      </small>
    </footer>
  );
};
export default Footer;

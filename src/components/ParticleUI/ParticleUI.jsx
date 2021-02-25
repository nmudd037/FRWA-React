import './particles.css';

import Particles from 'react-particles-js';

const ParticleUI = () => {
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

  return <Particles className="particles" params={particlesOptions} />;
};

export default ParticleUI;

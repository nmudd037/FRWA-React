import './FaceRecognition.css';

import React from 'react';

// eslint-disable-next-line no-unused-vars
const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="flex justify-center ma" id="imageContainer">
      <div className="absolute mt2">
        <img id="inputImage" alt="" src={imageUrl} width="auto" height="500px" />
        {box.map((dimensions) => {
          return (
            <div
              className="bounding-box"
              style={{
                top: dimensions.topRow,
                bottom: dimensions.bottomRow,
                left: dimensions.leftCol,
                right: dimensions.rightCol,
              }}
              key={dimensions.topRow}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;

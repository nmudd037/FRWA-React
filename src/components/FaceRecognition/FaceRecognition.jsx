import './FaceRecognition.css';

import { useEffect } from 'react';

import { setImageBox, useFrwa } from '../../context/frwa/FrwaState';
import { calculateFaceLocation } from './FrwaLogic/FrwaLogic';

const FaceRecognition = () => {
  const [frwaState, frwaDispatch] = useFrwa();

  const { imageUrl, boundingBox, box } = frwaState;

  useEffect(() => {
    if (boundingBox) {
      setImageBox(frwaDispatch, calculateFaceLocation(boundingBox));
    }
  }, [boundingBox, frwaDispatch]);

  return (
    <div className="flex justify-center ma" id="imageContainer">
      <div className="absolute mt2">
        {imageUrl && <img id="inputImage" alt="FRWA" src={imageUrl} className="image" />}
        {box &&
          box.map((dimensions) => {
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

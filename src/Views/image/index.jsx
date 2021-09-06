/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { calculateAspectRatioFit } from '../../Utils/utils';

export default (props) => {
  const {
    name,
    dimensions,
    clearImg,
  } = props;
  const [imgDimensions, setImgDimensions] = useState({ width: 426.2240663900415, height: 240 });
  const [bigImgDimensions, setBigImgDimensions] = useState(
    { width: 1845.9999999999998, height: 1040 },
  );
  const [isOpen, setIsOpen] = useState(false);

  const onImgLoad = ({ target: img }) => {
    const width = img.offsetWidth;
    const height = img.offsetHeight;
    const calculated = calculateAspectRatioFit(width, height, dimensions[0], dimensions[1]);
    const calculatedBig = calculateAspectRatioFit(
      // eslint-disable-next-line no-restricted-globals
      width, height, screen.availWidth * 0.7, screen.availHeight * 0.7,
    );
    setImgDimensions(calculated);
    setBigImgDimensions(calculatedBig);
  };

  const handleShowDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <img
        className="block m-auto"
        width={imgDimensions.width}
        height={imgDimensions.height}
        src={clearImg}
        onLoad={onImgLoad}
        onClick={handleShowDialog}
        alt={name}
      />

      {
      isOpen && (
        <dialog
          className="dialog"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            background: 'rgba(10,10,10,0.7)',
          }}
          open
          onClick={handleShowDialog}
        >
          <img
            className="image"
            width={bigImgDimensions.width}
            height={bigImgDimensions.height}
            src={clearImg}
            onClick={handleShowDialog}
            alt={name}
          />
        </dialog>
      )
}
    </>
  );
};

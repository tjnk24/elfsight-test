import React, { FC, useEffect, useState } from 'react';
import { BackIcon, NextIcon, CloseIcon } from './icons';
import { ModalProps } from './types';

import './style.scss';

const Modal: FC<ModalProps> = ({ photos, currentId, closeHandler }) => {
  const [currentPhotoId, setCurrentPhotoId] = useState(currentId);

  const changePhoto = (changeParam: number) => {
    const newCurrent = currentPhotoId + changeParam;

    setCurrentPhotoId(newCurrent);
  };

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';

    return () => {
      document.querySelector('body').style.overflow = 'initial';
    };
  }, []);

  return (
    <div
      className="modal"
      style={{ top: window.scrollY }}
    >
      <div
        className="modal__backdrop"
        onClick={() => closeHandler(false)}
        onKeyDown={() => closeHandler(false)}
      />
      <button
        type="button"
        className="modal__close-button"
        onClick={() => closeHandler(false)}
      >
        { CloseIcon }
      </button>
      <div className="modal__container">
        <button
          type="button"
          onClick={() => changePhoto(-1)}
        >
          { BackIcon }
        </button>
        <div className="modal-container">
          <img src={photos[currentPhotoId].url} alt="modal" />
          <div className="modal-container__title">
            {photos[currentPhotoId].title}
          </div>
        </div>
        <button
          type="button"
          onClick={() => changePhoto(1)}
        >
          { NextIcon }
        </button>
      </div>
    </div>
  );
};

export default Modal;

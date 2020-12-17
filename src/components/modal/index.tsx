import React, { FC, useEffect } from 'react';
import Preloader from '@components/preloader';
import { BackIcon, NextIcon, CloseIcon } from './icons';
import { ModalProps } from './types';

import './style.scss';

const Modal: FC<ModalProps> = ({ closeHandler }) => {
  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = 'initial';
    };
  }, []);

  return (
    <div className="modal">
      <button
        type="button"
        className="modal__close-button"
        onClick={() => closeHandler(false)}
      >
        { CloseIcon }
      </button>
      <div className="modal__container">
        <button type="button">
          { BackIcon }
        </button>
        <div className="modal-container">
          {/* <Preloader /> */}
          <img src="https://via.placeholder.com/600/8e973b" alt="modal" />
          <div className="modal-container__title">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, molestiae!</div>
        </div>
        <button type="button">
          { NextIcon }
        </button>
      </div>
    </div>
  );
};

export default Modal;

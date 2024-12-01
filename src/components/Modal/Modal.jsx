import React, { useEffect, useState } from "react";
import './Modal.css';

function Modal({ message, isError, onClose, messageError }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isClosing) {
      const closeTimer = setTimeout(onClose, 500);
      return () => clearTimeout(closeTimer);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`modal ${isError ? 'modal--error' : 'modal--success'} ${isClosing ? 'modal-close' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={() => setIsClosing(true)}>&times;</span>
        <p>{message}</p>
        <p>{messageError}</p>
      </div>
    </div>
  );
}

export default Modal;

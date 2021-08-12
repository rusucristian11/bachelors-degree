import React from 'react'
import './AlertComponent.scss'

export const AlertComponent = ({ handleClose, show, children, className }) => {
  const showHideClassName = show ? `modal display-block` : `modal display-none`;
  console.log(showHideClassName, 'AlertComponent')
  return (
    <div className={showHideClassName}>
      <section className={`modal-main ${className}`}>
        <div className='close-modal' onClick={handleClose}/>
        {children}
      </section>
    </div>
  );
};

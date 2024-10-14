import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header__content">
        <div className="content__logo">
        <a href="#"><img className="header-logo" src="" alt="Логотип команды" /></a>
        <a href="#"><img className="header-logo" src="" alt="Логотип компании" /></a>
        </div>
        <div className="content__nav">
        <button className="button-black header-lk" type="button">
            Личный <br /> кабинет
        </button>
        </div>
    </div>
  );
}

export default Header;

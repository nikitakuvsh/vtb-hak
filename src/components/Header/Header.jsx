import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import logoTeam from '../../img/logo/logo-team.png';
import logoIconTeam from '../../img/logo/logo-team-icon.svg';
import profileIcon from '../../img/icons/header-default-user-icon.png';

function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 1400px)").matches);

  const hiddenImagePaths = [
    '/',
    '/register-choice',
    '/reset-password',
    '/register-employee',
    '/register-worker',
    '/auth-worker',
    '/auth-employee',
  ];

  const showImage = !hiddenImagePaths.includes(location.pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1400px)").matches);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { path: '/choice-worker', label: 'Выбор сотрудников' },
    { path: '/manage-worker', label: 'Управление сотрудниками' },
    { path: '/wallet', label: 'Кошелёк' },
  ];

  return (
    <div className="header__content">
      {showImage && (
        <>
          <div className="header__logo">
            <a href="">
              <img className="header__logo-image" src={isMobile ? logoIconTeam : logoTeam} alt="Логотип" />
            </a>
            <a href=""><img className="header__logo-image" src="" alt="Логотип компании" /></a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.path} className={`header__nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                  <a href={item.path} className="header__nav-link">{item.label}</a>
                </li>
              ))}
              <li className="header__nav-item">
                <button className="header__nav-button" onClick={() => window.location.href=`/profile/id`}>
                  <img src={profileIcon} alt="Профиль" className="header__nav-button-icon" />
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default Header;

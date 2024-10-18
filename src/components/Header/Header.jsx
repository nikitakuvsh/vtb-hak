import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import logoTeam from '../../img/logo/logo-team.png';
import logoIconTeam from '../../img/logo/logo-team-icon.svg';
import logoCompany from '../../img/logo/loco-company.png';
import logoCompanyIcon from '../../img/logo/loco-company-icon.png';
import profileIcon from '../../img/icons/header-default-user-icon.png';

function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 1400px)").matches);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null); // Состояние для хранения роли пользователя

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole'); // Получаем роль из localStorage
    if (id) {
      setUserId(id);
    }
    if (role) {
      setUserRole(role); // Устанавливаем роль в состояние
    }
  }, []);

  const hiddenImagePaths = [
    '/',
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

  // Меню для работника (Worker)
  const workerNavItems = [
    { path: `/choice-employer/${userId}`, label: 'Выбор работодателей' },
    { path: `/my-work/${userId}`, label: 'Моя работа' },
    { path: `/wallet/${userId}`, label: 'Кошелёк' },
  ];

  // Меню для работодателя (Employer)
  const employerNavItems = [
    { path: `/choice-worker/${userId}`, label: 'Выбор сотрудников' },
    { path: `/manage-worker/${userId}`, label: 'Управление сотрудниками' },
    { path: `/wallet/${userId}`, label: 'Кошелёк' },
  ];

  const navItems = userRole === 'Worker' ? workerNavItems : employerNavItems;

  // Определяем корректный путь для кнопки "Профиль"
  const profilePath = userRole === 'Employer' ? `/company-profile/${userId}` : `/profile/${userId}`;

  return (
    <div className="header__content">
      {showImage && (
        <>
          <div className="header__logo">
            <Link to="/">
              <img className="header__logo-image" src={isMobile ? logoIconTeam : logoTeam} alt="Логотип команды" />
            </Link>
            <Link to="/">
              <img className="header__logo-image" src={isMobile ? logoCompanyIcon : logoCompany} alt="Логотип компании" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.path} className={`header__nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                  <Link to={item.path} className="header__nav-link">{item.label}</Link>
                </li>
              ))}
              <li className="header__nav-item">
                <button className="header__nav-button" onClick={() => window.location.href = profilePath}>
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

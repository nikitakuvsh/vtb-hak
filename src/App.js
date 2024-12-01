import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import MainTitleSection from './components/MainTitleSection/MainTitleSection';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterChoice from './components/RegisterForm/RegisterChoice';
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm';
import RegisterFormEmployee from './components/RegisterForm/RegisterFormEmployee';
import RegisterFormWorker from './components/RegisterForm/RegisterFormWorker';
import Profile from './components/Profle/Profile';
import ChoiceCompany from './components/ChoiceCompany/ChoiceCompany';
import ChoiceWorker from './components/ChoiceWorker/ChoiceWorker';
import axios from 'axios';
const App = () => {
	const location = useLocation();
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        // setShowTokenModal(true); //Если будет время из шин перенеси сюда модалку токена, ты видел как я перенес на логины, так что дерзай
      }
      return Promise.reject(error);
    }
  );
	const handleLogout = () => {
	localStorage.removeItem('token');
	setAuth(false);
	};
	const [isAuthenticated, setAuth] = useState(!!localStorage.getItem('token'));
  return (
    <>
      <header className="header">
        <div className="fixed-container">
          <AnimatedZoomIn>
            <Header />
          </AnimatedZoomIn>
          <AnimatedZoomIn>
            <Title />
          </AnimatedZoomIn>
        </div>
      </header>
      <main className="main">
        <div className="fixed-container">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={<AnimatedZoomIn><RegisterChoice /></AnimatedZoomIn>} 
              />
              <Route 
                path="/auth-worker" 
                element={<AnimatedZoomIn><AuthForm setAuth={setAuth} /></AnimatedZoomIn>} 
              />
              <Route 
                path="/auth-employee" 
                element={<AnimatedZoomIn><AuthForm  setAuth={setAuth} /></AnimatedZoomIn>} 
              />
              <Route 
                path="/reset-password" 
                element={<AnimatedZoomIn><PasswordResetForm /></AnimatedZoomIn>} 
              />
              <Route 
                path="/register-employee" 
                element={<AnimatedZoomIn><RegisterFormEmployee /></AnimatedZoomIn>} 
              />
              <Route 
                path="/register-worker" 
                element={<AnimatedZoomIn><RegisterFormWorker /></AnimatedZoomIn>} 
              />
              <Route 
                path="/profile/"
                element={<AnimatedZoomIn><Profile /></AnimatedZoomIn>} // Страница для работника
              />
              <Route 
                path="/company-profile"
                element={<AnimatedZoomIn><Profile /></AnimatedZoomIn>} // Страница для работодателя
              />
              <Route 
                path="/choice-company"
                element={<AnimatedZoomIn><ChoiceCompany /></AnimatedZoomIn>} // Страница для работодателя
              />
              <Route 
                path="/choice-worker"
                element={<AnimatedZoomIn><ChoiceWorker /></AnimatedZoomIn>} // Страница для работодателя
              />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

const Title = () => {
  const location = useLocation();
  let title;

  switch (location.pathname) {
    case `/auth-employee`:
    case `/auth-worker`:
      title = 'Авторизация';
      break;
    case `/`:
      title = 'Выбор роли';
      break;
    case `/reset-password`:
      title = 'Сброс пароля';
      break;
    case `/register-employee`:
      title = 'Регистрация работодателя';
      break;
    case `/register-worker`:
      title = 'Регистрация сотрудника';
      break;
    default:
      title = 'Извините, такой страницы не существует :(';
  }

  if (location.pathname.startsWith('/choice-worker')) {
    title = 'Выбор сотрудников';
  }
  if (location.pathname.startsWith('/profile') || location.pathname.startsWith('/company-profile')) {
    title = 'Мой профиль';
  }
  if (location.pathname.startsWith('/choice-company')){
    title = 'Выбор работадателей';
  }

  return <MainTitleSection title={title} />;
};

const AnimatedZoomIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
    transition={{ 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }} 
  >
    {children}
  </motion.div>
);

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

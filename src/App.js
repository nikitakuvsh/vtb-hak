import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import MainTitleSection from './components/MainTitleSection/MainTitleSection';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterChoice from './components/RegisterForm/RegisterChoice';
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm';
import RegisterFormEmployee from './components/RegisterForm/RegisterFormEmployee';
import RegisterFormWorker from './components/RegisterForm/RegisterFormWorker';
import ChoiceWorker from './components/Employee/ChoiceWorker';
import ManageWorker from './components/Employee/ManageWorker';
import Wallet from './components/wallet/Wallet';

const App = () => {
  const location = useLocation();

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
                element={<AnimatedZoomIn><AuthForm /></AnimatedZoomIn>} 
              />
              <Route 
                path="/auth-employee" 
                element={<AnimatedZoomIn><AuthForm /></AnimatedZoomIn>} 
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
                path="/choice-worker"
                element={<AnimatedZoomIn><ChoiceWorker /></AnimatedZoomIn>}
              />
              <Route 
                path="/manage-worker"
                element={<AnimatedZoomIn><ManageWorker /></AnimatedZoomIn>}
              />
              <Route 
                path="/wallet"
                element={<AnimatedZoomIn><Wallet /></AnimatedZoomIn>}
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
    case '/auth-employee':
      title = 'Авторизация';
      break;
    case '/auth-worker':
      title = 'Авторизация';
      break;
    case '/':
      title = 'Выбор роли';
      break;
    case '/reset-password':
      title = 'Сброс пароля';
      break;
    case '/register-employee':
      title = 'Регистрация работодателя';
      break;
    case '/register-worker':
      title = 'Регистрация сотрудника';
      break;
    case '/choice-worker':
      title = 'Выбор сотрудников';
      break;
    case '/manage-worker':
      title = 'Управление сотрудниками';
      break;
    case '/wallet':
      title = 'Кошелёк';
      break;
    default:
      title = '';
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

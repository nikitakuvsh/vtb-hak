import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import MainTitleSection from './components/MainTitleSection/MainTitleSection';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterChoice from './components/RegisterForm/RegisterChoice';
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm';
import RegisterFormEmployee from './components/RegisterForm/RegisterFormEmployee';
import RegisterFormWorker from './components/RegisterForm/RegisterFormWorker';

const App = () => {
  return (
    <Router>
      <header className="header">
        <div className="fixed-container">
          <Header />
          <Title />
        </div>
      </header>
      <main className="main">
        <div className="fixed-container">
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/register-choice" element={<RegisterChoice />} />
            <Route path="/reset-password" element={<PasswordResetForm />} />
            <Route path="/register-employee" element={<RegisterFormEmployee />} />
            <Route path="/register-worker" element={<RegisterFormWorker />}></Route>
          </Routes>
        </div>
      </main>
    </Router>
  );
};

const Title = () => {
  const location = useLocation();
  let title;

  switch (location.pathname) {
    case '/':
      title = 'Авторизация';
      break;
    case '/register-choice':
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
  }

  return <MainTitleSection title={title} />;
};

export default App;

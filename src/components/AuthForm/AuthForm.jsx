import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';

function AuthForm() {
  const location = useLocation();
  const isEmployeePath = location.pathname === '/auth-employee';
  const registerPath = isEmployeePath ? '/register-employee' : '/register-worker';

  const handleSubmit = (event) => {
    event.preventDefault();
    // Логика отправки данных формы
  };

  return (
    <div className="form__auth">
      <div className="auth__content">
        <form onSubmit={handleSubmit} action="#" method="post">
          <input
            type="email"
            className="form__input email-input"
            name="email-input"
            placeholder="Ваша почта"
            required
          />
          <input
            type="password"
            className="form__input password-input"
            name="password-input"
            placeholder="Ваш пароль"
            required
          />
          {isEmployeePath && (
            <input
              type="text"
              className="form__input inn-input"
              name="inn-input"
              placeholder="ИНН"
              required
            />
          )}
          <button className="submit-button auth__button" type="submit">
            Войти
          </button>
          <div className="auth__link-container">
            <span className="auth__span">
              Забыли пароль? <Link className="auth__link" to="/reset-password">Восстановить</Link>
            </span>
            <span className="auth__span">
              Нет аккаунта? <Link className="auth__link" to={registerPath}>Создать</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;

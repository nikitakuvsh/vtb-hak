import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function AuthForm() {
  return (
    <div className="form__auth">
      <div className="auth__content">
        <form action="#" method="post">
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
          <button className="submit-button auth__button" type="submit">
            Войти
          </button>
          <div className="auth__link-container">
            <span className="auth__span">
              Забыли пароль? <Link className="auth__link" to="/reset-password">Восстановить</Link>
            </span>
            <span className="auth__span">
              Нет аккаунта? <Link className="auth__link" to="/register-choice">Создать</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;

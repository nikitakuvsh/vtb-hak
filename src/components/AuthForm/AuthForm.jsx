import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';

function AuthForm() {
  const location = useLocation();
  const isEmployeePath = location.pathname === '/auth-employee';
  const registerPath = isEmployeePath ? '/register-employee' : '/register-worker';
  const inputRefs = useRef([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};

    if (isEmployeePath) {
      formData = {
        email: inputRefs.current[0]?.value || '',
        password: inputRefs.current[1]?.value || '',
        INN: inputRefs.current[2]?.value || '',
        account_type: "Employer",
      };
    } else {
      formData = {
        email: inputRefs.current[0]?.value || '',
        password: inputRefs.current[1]?.value || '',
        account_type: "Worker",
      };
    }

    try {
      const response = await fetch(process.env.REACT_APP_BACK_API+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const response_json = await response.json();
        console.log(response_json);
        if (isEmployeePath) {
          window.location.href = "/company-profile/" + response_json.user_id;
        } else {
          window.location.href = "/profile/" + response_json.user_id;
        }
      } else {
        console.error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
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
            ref={(el) => (inputRefs.current[0] = el)}
            required
          />
          <input
            type="password"
            className="form__input password-input"
            name="password-input"
            placeholder="Ваш пароль"
            ref={(el) => (inputRefs.current[1] = el)}
            required
          />
          {isEmployeePath && (
            <input
              type="text"
              className="form__input inn-input"
              name="inn-input"
              placeholder="ИНН"
              ref={(el) => (inputRefs.current[2] = el)}
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

import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';
import axios from "axios";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
function AuthForm({ setAuth }) {
	const location = useLocation();
	const isEmployeePath = location.pathname === '/auth-employee';
	const registerPath = isEmployeePath ? '/register-employee' : '/register-worker';
	const inputRefs = useRef([]);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [modalErrorMessage, setModalErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
	let password = '';
	let email = '';
    if (isEmployeePath) {
      formData = {
        email: inputRefs.current[0]?.value || '',
        password: inputRefs.current[1]?.value || '',
        INN: inputRefs.current[2]?.value || '',
        account_type: "Employer",
      };
	  password=inputRefs.current[1]?.value || '';
	  email=inputRefs.current[0]?.value || '';
    } else {
      formData = {
        email: inputRefs.current[0]?.value || '',
        password: inputRefs.current[1]?.value || '',
        account_type: "Worker",
      };
	  password=inputRefs.current[1]?.value || '';
	  email=inputRefs.current[0]?.value || '';
    }

    try {
		const response = await axios.post(process.env.REACT_APP_BACK_API+'/api/worker/login', {
               email:email,  password:password
            });
			setModalMessage("Авторизация прошла успешно!");
            setIsError(false);
            setShowModal(true);
            localStorage.setItem('token', response.data.access_token);
            setAuth(true);

            // Показ модального окна перед редиректом
            setTimeout(() => {
                setShowModal(false); // Закрываем модальное окно
                navigate('/profile'); // Выполняем редирект
            }, 3000); // Ожидание 3 секунд перед закрытием и редиректом

        } catch (error) {
            setModalMessage("Ошибка входа");
            setModalErrorMessage(error.response?.data?.error || 'Произошла ошибка');
            setIsError(true);
            setShowModal(true);
            
            // Закрываем окно через 3 секунды при ошибке, без редиректа
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
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

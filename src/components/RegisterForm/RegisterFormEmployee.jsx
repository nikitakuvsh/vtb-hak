import React, { useEffect, useRef } from "react";
import AddressInput from './AddressInput';
import userIcon from '../../img/user.png';
import './RegisterFormEmployee.css';

function RegisterFormEmployee() {
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current.forEach(input => {
            const label = input?.previousElementSibling;
            if (label) {
                const labelWidth = label.offsetWidth;
                const padding = 20;
                input.style.paddingLeft = `${labelWidth + padding}px`;
            }
        });
    }, []);

    return (
        <div className="registration-container">
            <div className="registration__role">
                <img className="choice__icon employee__icon" src={userIcon} alt="Иконка пользователя" />
                <h2 className="choice__title">Работодатель</h2>
            </div>
            <div className="registration__form form__employee">
                <form action="#" method="post">
                    <div className="input-container">
                        <label htmlFor="name-of-company" className="floating-label">Название компании</label>
                        <input
                            type="text"
                            className="form__input"
                            name="name-of-company-input"
                            required
                            id="name-of-company"
                            ref={el => inputRefs.current[0] = el}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="email" className="floating-label">Ваш email</label>
                        <input
                            type="email"
                            className="form__input"
                            name="email-input"
                            required
                            id="email"
                            ref={el => inputRefs.current[1] = el}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="phone" className="floating-label">Телефон</label>
                        <input
                            type="tel"
                            className="form__input"
                            name="phone-number-input"
                            required
                            id="phone"
                            ref={el => inputRefs.current[2] = el}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password" className="floating-label">Пароль</label>
                        <input 
                            type="password"
                            className="form__input"
                            name="password"
                            required
                            id="password"
                            ref={el => inputRefs.current[3] = el}
                        />
                    </div>

                    <AddressInput ref={el => inputRefs.current[4] = el} />

                    <button className="submit-button auth__button" type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterFormEmployee;

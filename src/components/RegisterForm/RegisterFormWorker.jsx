import React, { useEffect, useRef, useState } from "react";
import userIcon from '../../img/user.png';
import './RegisterFormEmployee.css';

function RegisterFormEmployee() {
    const inputRefs = useRef([]);
    const [profileImage, setProfileImage] = useState(userIcon);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const updatePadding = () => {
            inputRefs.current.forEach(input => {
                const label = input?.previousElementSibling;
                if (label) {
                    const labelWidth = label.offsetWidth;
                    const padding = 20;
                    input.style.paddingLeft = `${labelWidth + padding}px`;
                }
            });
        };
    
        const timeout = setTimeout(updatePadding, 100);
    
        window.addEventListener('resize', updatePadding);
    
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updatePadding);
        };
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration__role">
                <img className="choice__icon worker__icon registration__icon--fix" src={profileImage} alt="Иконка пользователя" />
                <h2 className="choice__title">Сотрудник</h2>
                <button 
                    className="choice__change-image" 
                    type="button" 
                    onClick={() => fileInputRef.current.click()}
                >
                    Выбрать свою фотографию
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    accept="image/*"
                />
            </div>

            <div className="registration__form form__employee">
                <form action="#" method="post">
                    <div className="input-container">
                        <label htmlFor="name-of-user" className="floating-label">Имя</label>
                        <input
                            type="text"
                            className="form__input"
                            name="name-of-user-input"
                            required
                            id="name-of-user"
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

                    <button className="submit-button auth__button" type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterFormEmployee;

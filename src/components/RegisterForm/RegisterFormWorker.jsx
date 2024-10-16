import React, { useEffect, useRef, useState } from "react";
import userIcon from '../../img/user.png';
import './RegisterFormEmployee.css';

function RegisterFormEmployee() {
    const inputRefs = useRef([]);
    const [profileImage, setProfileImage] = useState(userIcon);
    const fileInputRef = useRef(null);
    const [ageError, setAgeError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const validateAge = (birthDate) => {
        const today = new Date();
        const futureDate = birthDate > today;

        if (futureDate) {
            return "Введите правильную дату.";
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return "Возраст должен быть не меньше 18 лет.";
        } else if (age > 100) {
            return "Введите реальный возраст.";
        }
        return "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const birthDateValue = inputRefs.current[1].value;
        if (birthDateValue) {
            const birthDate = new Date(birthDateValue);
            const ageValidationMessage = validateAge(birthDate);
            if (ageValidationMessage) {
                setAgeError(ageValidationMessage);
                setIsModalOpen(true);
                return;
            }
        }
        setAgeError('');
        // Логика отправки формы
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal();
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
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="birthday" className="floating-label">Ваша дата рождения</label>
                        <input
                            type="date"
                            className="form__input"
                            name="birthday"
                            required
                            id="birthday"
                            ref={el => inputRefs.current[1] = el}
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
                            ref={el => inputRefs.current[2] = el}
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
                            ref={el => inputRefs.current[3] = el}
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
                            ref={el => inputRefs.current[4] = el}
                        />
                    </div>

                    <button className="submit-button auth__button" type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>

            {isModalOpen && (
                <div className="modal" onClick={handleModalClick}>
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>ОК</span>
                        <p>{ageError}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegisterFormEmployee;

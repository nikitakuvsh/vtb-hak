import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import './Profile.css';
import useBackgroundSetter from '../../useBackgroundSetter';
import userIcon from '../../img/icons/header-default-user-icon.png';
import axios from "axios";

function Profile() {
    useBackgroundSetter();
    const location = useLocation();
    const inputRefs = useRef([]);
    const fileInputRef = useRef(null);
    const resumeInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(userIcon);
    const [resumeName, setResumeName] = useState("");
    const [isResumeUploaded, setIsResumeUploaded] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);
    const token = localStorage.getItem('token');
    console.log(token);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            alert('Файл не выбран.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_API}/api/worker/upload_profile_image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;
            console.log('Фото успешно загружено:', data);

            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert(`Ошибка: ${error.response?.data?.error || 'Не удалось загрузить изображение'}`);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        const payload = {
            // Collect the form data
            'name': inputRefs.current[0]?.value || null,
            'email': inputRefs.current[1]?.value || null,
            'phone': inputRefs.current[2]?.value || null,
            ...(userRole === 'Worker' && {
                'birthday': inputRefs.current[3]?.value || null,
                'education': inputRefs.current[4]?.value || null,
                'about': inputRefs.current[5]?.value || null,
                'contacts': inputRefs.current[6]?.value || null,
            }),
            ...(userRole === 'Employer' && {
                'company-name': inputRefs.current[3]?.value || null,
                'company-email': inputRefs.current[4]?.value || null,
                'company-phone': inputRefs.current[5]?.value || null,
                'company-address': inputRefs.current[6]?.value || null,
                'company-description': inputRefs.current[7]?.value || null,
            }),
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_API}/api/worker/update_info`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            alert('Данные успешно обновлены');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            alert(`Ошибка: ${error.response?.data?.error || 'Не удалось обновить данные'}`);
        }
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACK_API}/api/worker/get_profile_image`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                setProfileImage(response.data.url || userIcon);
            } catch (error) {
                console.error('Ошибка при загрузке фотографии профиля:', error);
                setProfileImage(userIcon);
            }
        };

        fetchProfileImage();
    }, [token]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACK_API}/api/worker/get_user_id_info`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;
                inputRefs.current.forEach((input, index) => {
                    if (data.user_info[input.name] !== null && data.user_info[input.name] !== undefined) {
                        input.value = data.user_info[input.name];
                    }
                });
            } catch (error) {
                console.error('Ошибка при получении информации о пользователе:', error);
            }
        };

        fetchUserInfo();
    }, [isEmployer]);

    // Padding adjustment logic remains unchanged
    useEffect(() => {
        const updatePadding = () => {
            inputRefs.current.forEach((input) => {
                const label = input?.previousElementSibling;
                if (label) {
                    const labelWidth = label.offsetWidth;
                    const padding = 30;
                    input.style.paddingLeft = `${labelWidth + padding}px`;
                }
            });
        };

        const timeout = setTimeout(updatePadding, 1);
        window.addEventListener('resize', updatePadding);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updatePadding);
        };
    }, []);

    return (
        <div className='profile-container'>
            <form onSubmit={handleSubmit}>
                <div className='profile__image'>
                    <img className="choice__icon worker__icon registration__icon--fix" src={profileImage} alt="Иконка пользователя" />
                    <h2 className="choice__title">{isEmployer ? 'Работодатель' : 'Сотрудник'}</h2>
                    <button 
                        className="choice__change-image" 
                        type="button" 
                        onClick={() => fileInputRef.current.click()}
                    >
                        Изменить свою фотографию
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                </div>
                <div className='profile__form'>
                    <div className='input-container'>
                        <label htmlFor='edit-name' className='floating-label'>Имя</label>
                        <input className='form__input' type='text' id='edit-name' name='edit-name' ref={el => inputRefs.current[0] = el}></input>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='email' className='floating-label'>Электронная почта</label>
                        <input className='form__input' type='email' id='email' name='email' ref={el => inputRefs.current[1] = el}></input>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='phone-number' className='floating-label'>Телефонный номер</label>
                        <input className='form__input' type='text' id='phone-number' name='phone-number' ref={el => inputRefs.current[2] = el}></input>
                    </div>
                    {!isEmployer && ( 
                        <>
                            <div className='input-container'>
                                <label htmlFor='birthday' className='floating-label'>Дата рождения</label>
                                <input className='form__input' type='text' id='birthday' name='birthday' ref={el => inputRefs.current[3] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='education' className='floating-label'>Образование</label>
                                <input className='form__input' type='text' id='education' name='education' ref={el => inputRefs.current[4] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='about' className='floating-label'>Обо мне</label>
                                <input className='form__input' type='text' id='about' name='about' ref={el => inputRefs.current[5] = el}></input>
                            </div>
							<div className='input-container'>
                                <label htmlFor='contacts' className='floating-label'>Контакты для связи</label>
                                <input className='form__input' type='text' id='contacts' name='contacts' ref={el => inputRefs.current[6] = el}></input>
                            </div>
							

                        </>
                    )}
                    {isEmployer && ( 
                        <>

                            <div className='input-container'>
                                <label htmlFor='company-address' className='floating-label'>Адрес компании</label>
                                <input className='form__input' type='text' id='company-address' name='company-address' ref={el => inputRefs.current[3] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='foundation-date' className='floating-label'>Дата основания</label>
                                <input className='form__input' type='text' id='foundation-date' name='foundation-date' ref={el => inputRefs.current[7] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='director' className='floating-label'>Руководитель</label>
                                <input className='form__input' type='text' id='director' name='director' ref={el => inputRefs.current[8] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='directions' className='floating-label'>Направления</label>
                                <input className='form__input' type='text' id='directions' name='directions' ref={el => inputRefs.current[9] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='organization-form' className='floating-label'>Форма организации</label>
                                <input className='form__input' type='text' id='organization-form' name='organization-form' ref={el => inputRefs.current[10] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='choice-worker-resume' className='floating-label'>Каких сотрудников ищите?</label>
                                <input className='form__input' type='text' id='choice-worker-resume' name='choice-worker-resume' ref={el => inputRefs.current[11] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='worker-salary' className='floating-label'>Какая зп будет у сотрудника?</label>
                                <input className='form__input' type='text' id='worker-salary' name='worker-salary' ref={el => inputRefs.current[12] = el}></input>
                            </div>
                        </>
                    )}
                    <button className="change-profile-button submit-button auth__button" type="submit">Подтвердить</button>
                </div>
            </form>
        </div>
    );
}

export default Profile;

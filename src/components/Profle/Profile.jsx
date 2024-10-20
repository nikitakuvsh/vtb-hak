import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import './Profile.css';
import useBackgroundSetter from '../../useBackgroundSetter';
import userIcon from '../../img/icons/header-default-user-icon.png';
import { ReactComponent as CheckIcon } from '../../img/icons/check-icon.svg';

function Profile() {
    useBackgroundSetter();
    const { id } = useParams();
    const location = useLocation();
    const inputRefs = useRef([]);
    const fileInputRef = useRef(null);
    const resumeInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(userIcon);
    const [resumeName, setResumeName] = useState("");
    const [isResumeUploaded, setIsResumeUploaded] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		
		if (file) {
			const formData = new FormData();
			formData.append('image', file);
			
			const userId = localStorage.getItem('userId');

			try {
				const response = await fetch(`http://92.53.64.89:8092/upload_profile_image/${userId}`, {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					const reader = new FileReader();
					reader.onload = (e) => setProfileImage(e.target.result);
					reader.readAsDataURL(file);
					alert('Фото успешно обновлено');
				} else {
					alert('Ошибка при обновлении фото');
				}
			} catch (error) {
				console.error('Ошибка при загрузке фото:', error);
				alert('Произошла ошибка при загрузке фото.');
			}
		}
	};


	const handleSubmit = async (event) => {
		event.preventDefault();

		const userRole = localStorage.getItem('userRole'); 
		const userId = localStorage.getItem('userId');

		const payload = {
			id: userId,
			account_type: userRole,
			// Collect the form data
			'edit-name': inputRefs.current[0]?.value || null,
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
			})
		};

		try {
			const response = await fetch('http://92.53.64.89:8092/update_user_info', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const result = await response.json();
			if (response.ok) {
				alert('Данные успешно обновлены');
			} else {
				alert(`Ошибка: ${result.error || 'Не удалось обновить данные'}`);
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error);
			alert('Произошла ошибка при обновлении данных.');
		}
	};


    const handleResumeUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setResumeName(file.name);
            setIsResumeUploaded(true);
        } else {
            alert("Пожалуйста, загрузите файл в формате PDF.");
            setResumeName("");
            setIsResumeUploaded(false);
        }
    };

    useEffect(() => {
        if (id) {
            localStorage.setItem('userId', id);
            const userRole = location.pathname.includes('company-profile') ? 'Employer' : 'Worker';
            localStorage.setItem('userRole', userRole);
            setIsEmployer(userRole === 'Employer');
        }
    }, [id, location.pathname]);
	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const userId = localStorage.getItem('userId');
				const response = await fetch(`http://92.53.64.89:8092/get_profile_image/${userId}`);
				
				if (response.ok) {
					const imageUrl = response.url;
					setProfileImage(imageUrl);
				} else {
					setProfileImage(userIcon);
				}
			} catch (error) {
				console.error('Ошибка при загрузке фотографии профиля:', error);
			}
		};

		fetchProfileImage();
	}, [id]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://92.53.64.89:8092/get_user_id_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: localStorage.getItem('userId'),
                        account_type: isEmployer ? 'Employer' : 'Worker'
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    inputRefs.current.forEach((input, index) => {
                        if (data['user_info'][input.name] !== null && data['user_info'][input.name] !== undefined) {
                            input.value = data['user_info'][input.name];

                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [isEmployer]);

    useEffect(() => {
        const updatePadding = () => {
            inputRefs.current.forEach(input => {
                const label = input?.previousElementSibling;
                if (label) {
                    const labelWidth = label.offsetWidth;
                    const padding = 10;
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
                                <label htmlFor='company-name' className='floating-label'>Имя компании</label>
                                <input className='form__input' type='text' id='company-name' name='company-name' ref={el => inputRefs.current[3] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='company-email' className='floating-label'>Электронная почта компании</label>
                                <input className='form__input' type='email' id='company-email' name='company-email' ref={el => inputRefs.current[4] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='company-phone' className='floating-label'>Телефонный номер компании</label>
                                <input className='form__input' type='text' id='company-phone' name='company-phone' ref={el => inputRefs.current[5] = el}></input>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='company-address' className='floating-label'>Адрес компании</label>
                                <input className='form__input' type='text' id='company-address' name='company-address' ref={el => inputRefs.current[6] = el}></input>
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
                        </>
                    )}
                    <button className="change-profile-button submit-button auth__button" type="submit">Подтвердить</button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useBackgroundSetter from "../../useBackgroundSetter";
import './MyWork.css';

function MyWork() {
    useBackgroundSetter();

    const inputRefs = useRef([]);
    const [isEmployerModalOpen, setEmployerModalOpen] = useState(false);
    const [isWorkerModalOpen, setWorkerModalOpen] = useState(false);
    const id = localStorage.getItem('userId');

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
                        account_type : 'Worker'
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    inputRefs.current.forEach((input, index) => {
						console.log(data['user_info'][input.name]);
                        if (data['user_info'][input.name] !== null && data['user_info'][input.name] !== undefined) {
                            input.value = data['user_info'][input.name];

                        }else{
							input.value = "Нет данных";
						}
                    });
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    });
    const openEmployerModal = () => setEmployerModalOpen(true);
    const closeEmployerModal = () => setEmployerModalOpen(false);

    const openWorkerModal = () => setWorkerModalOpen(true);
    const closeWorkerModal = () => setWorkerModalOpen(false);

    return (
        <div className="my-work-container">
            <div className="combined-input">
                <div className="input-container">
                    <label htmlFor="name-company" className="floating-label">Название компании</label>
                    <input
                        className="form__input"
                        type="text"
                        name="name-company"
                        id="name-company"
                        ref={el => inputRefs.current[0] = el}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="worker-post" className="floating-label">Должность</label>
                    <input
                        className="form__input"
                        type="text"
                        name="worker-post"
                        id="worker-post"
                        ref={el => inputRefs.current[1] = el}
                    />
                </div>
            </div>

            <div className="combined-input">
                <div className="input-container">
                    <label htmlFor="worker-salary" className="floating-label">Заработная плата</label>
                    <input
                        className="form__input"
                        type="text"
                        name="worker-salary"
                        id="worker-salary"
                        ref={el => inputRefs.current[3] = el}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="month-bonus" className="floating-label">Премия за месяц</label>
                    <input
                        className="form__input"
                        type="text"
                        name="month-bonus"
                        id="month-bonus"
                        ref={el => inputRefs.current[4] = el}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="worker-experience" className="floating-label">Опыт</label>
                    <input
                        className="form__input"
                        type="text"
                        name="worker-experience"
                        id="worker-experience"
                        ref={el => inputRefs.current[5] = el}
                    />
                </div>
            </div>
            <div className="combined-input">
                <div className="input-container">
                    <label htmlFor="worker-done-salary" className="floating-label">Выплаченная зп</label>
                    <input
                        className="form__input"
                        type="text"
                        name="worker-done-salary"
                        id="worker-done-salary"
                        ref={el => inputRefs.current[6] = el}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="worker-rate" className="floating-label">Ставка</label>
                    <input
                        className="form__input"
                        type="text"
                        name="worker-rate"
                        id="worker-rate"
                        ref={el => inputRefs.current[7] = el}
                    />
                </div>
            </div>
            <div className="combined-buttons-container">
                <button className="write-employer submit-button auth__button" onClick={openEmployerModal}>
                    Написать работодателю
                </button>
                <button className="write-workers submit-button auth__button" onClick={openWorkerModal}>
                    Связаться с коллегами
                </button>
                <button className="check-feedback submit-button auth__button">Написать рекомендацию</button>
                <button className="edu-button submit-button auth__button"
                    onClick={() => window.location.href = `/education/${id}`}
                    >
                    Обучение
                </button>
                <button className="achievements-button submit-button auth__button" onClick={() => window.location.href = `/achieve/${localStorage.getItem('userId')}`}>Достижения</button>
                <button className="leave-company submit-button auth__button">Уволиться</button>
            </div>

            {/* Модальное окно для работодателя */}
            {isEmployerModalOpen && (
                <div className="modal-employer">
                    <div className="modal-content">
                        <span className="close" onClick={closeEmployerModal}>&times;</span>
                        <p>Тут будет контактная связь работодателя</p>
                    </div>
                </div>
            )}

            {/* Модальное окно для сотрудников */}
            {isWorkerModalOpen && (
                <div className="modal-worker">
                    <div className="modal-content">
                        <span className="close" onClick={closeWorkerModal}>&times;</span>
                        <p>Сотрудник n - Контакты сотрудника n</p>
                        <p>Сотрудник n - Контакты сотрудника n</p>
                        <p>Сотрудник n - Контакты сотрудника n</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyWork;

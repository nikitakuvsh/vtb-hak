import React, { useState } from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import './Education.css';
import documentIcon from '../../img/icons/document-icon.png';
import workerIconCard from '../../img/icons/worker-icon-card.svg';

function Education() {
    useBackgroundSetter();

    // Пример данных курсов
    const [courses] = useState([
        { id: 1, title: "Курс 1", description: "Описание курса 1", type: "required" },
        { id: 2, title: "Курс 2", description: "Описание курса 2", type: "not-required" },
        { id: 3, title: "Курс 3", description: "Описание курса 3", type: "my" }
    ]);

    const showEmployer = localStorage.getItem('userRole') === 'Employer';

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Обработка клика по карточке курса
    const handleCardClick = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
        
    };

    // Закрытие модального окна
    const closeModal = () => {
        setModalOpen(false);
        setSelectedCourse(null);
    };

    return (
        <>
            {showEmployer ? (
                <>
                    <div className="education-container">
                        <div className="education__card">
                            <div className="education-content">
                                <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                                <h2 className="education-card__title">Загрузить курс</h2>
                                <div className="education-buttons">
                                    <button
                                        className="create-course education__button button-submit auth__button"
                                        onClick={() => window.location.href = `/create-course/${localStorage.getItem('userId')}`}
                                    >
                                        Создать курс
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="education__card">
                            <div className="education-content">
                                <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                                <h2 className="education-card__title">Мои курсы</h2>
                                <div className="education-buttons">
                                    <button className="open-courses education__button button-submit auth__button">Открыть</button>
                                </div>
                            </div>
                        </div>

                        <div className="education__card">
                            <div className="education-content">
                                <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                                <h2 className="education-card__title">Сертификаты</h2>
                                <div className="education-buttons">
                                    <button className="add-sertificate education__button button-submit auth__button" onClick={() => window.location.href = `/create-sertificate/${localStorage.getItem('userId')}`}>Добавить</button>
                                    <button className="manage-sertificate education__button button-submit auth__button">Управлять</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education__card progress-worker">
                        <h2 className="education-card__title">Прогресс сотрудников</h2>
                        <div className="progress-worker__buttons education-buttons">
                            <button className="check-progress progress__button button-submit auth__button">Посмотреть</button>
                            <button className="send-message progress__button button-submit auth__button">Отправить сообщение</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="cards__inner">
                    <button className="education-button auth__button">Просмотр всех курсов обязательного обучения</button>
                    <button className="education-button auth__button">Просмотр всех курсов дополнительного обучения</button>
                    <button onClick={() => window.location.href = `/create-course/${localStorage.getItem('userId')}`} className="education-button auth__button">Создать собственный курс</button>
                    {courses.map(course => (
                        <div
                            key={course.id}
                            className="worker__card"
                            onClick={() => handleCardClick(course)}
                            data-id={course.id}
                            type = {course.type}
                        >
                            <div className="worker__card--image-container">
                                <img className="worker__card-image" src={workerIconCard} alt="Иконка курса" />
                            </div>
                            <div className="worker__card-content">
                                <h2 className="worker__card-title">{course.title}</h2>
                                <p className="worker__card-descr">{course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedCourse?.title}</h2>
                        <div className="modal-buttons-education">
                            {selectedCourse?.type !== 'my' &&(
                                <>
                                <button onClick={closeModal} className="auth__button">Написать создателю</button>
                                <button onClick={closeModal} className="auth__button">Оставить отзыв</button>
                                <button onClick={closeModal} className="auth__button">Достижения/прогресс</button>
                                </>
                            )}
                            {selectedCourse?.type == 'my' &&(
                                <>
                                <button onClick={closeModal} className="auth__button">Связаться с учениками</button>
                                <button onClick={closeModal} className="auth__button">Заблокировать ученика</button>
                                <button onClick={closeModal} className="auth__button">Добавить сертификат</button>
                                </>
                            )}
                        </div>
                        <button className="modal-close" onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Education;

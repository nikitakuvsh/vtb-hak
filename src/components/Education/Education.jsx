import React from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import './Education.css';
import documentIcon from '../../img/icons/document-icon.png';

function Education(){
    useBackgroundSetter();
    return(
        <>
        <div className="education-container">
            <div className="education__card">
                <div className="education-content">
                    <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                    <h2 className="education-card__title">Загрузить курс</h2>
                    <div className="education-buttons">
                        <button className="create-course education__button button-submit auth__button"
                            onClick={() => window.location.href = `/create-course/${localStorage.getItem('userId')}`}
                            >Создать курс</button>
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
                        <button className="add-sertificate education__button button-submit auth__button">Добавить</button>
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
    );
}

export default Education;

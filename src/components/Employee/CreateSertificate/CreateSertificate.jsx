import React, { useEffect, useRef, useState } from "react";
import useBackgroundSetter from "../../../useBackgroundSetter";
import documentIcon from '../../../img/icons/document-icon.png';
import './CreateSertificate.css';

function CreateSertificate() {
    useBackgroundSetter();
    const inputRefs = useRef([]);
    const [uploadMessage, setUploadMessage] = useState(''); // Сообщение о загрузке сертификата
    const [mainUploadMessage, setMainUploadMessage] = useState(''); // Сообщение о загрузке файла курса

    useEffect(() => {
        const updatePadding = () => {
            inputRefs.current.forEach(input => {
                const label = input?.previousElementSibling;
                if (label) {
                    const labelWidth = label.offsetWidth;
                    const padding = label.classList.contains('label-with-checkbox') ? 40 : 20;
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

    const handleFileSelect = (event) => {
        const fileIndex = event.currentTarget.getAttribute('data-file-index');
        const fileInput = inputRefs.current[fileIndex];
        if (fileInput) {
            fileInput.click();

            fileInput.onchange = () => {
                const fileName = fileInput.files[0]?.name || "Файл не выбран";
                if (fileIndex === '5') {
                    setUploadMessage(`Сертификат "${fileName}" загружен.`);
                } else if (fileIndex === '4') {
                    setMainUploadMessage(`Файл "${fileName}" загружен.`);
                }
            };
        }
    };

    const handleSubmitMainForm = async (event) => {
        event.preventDefault();
        // Логика отправки основной формы
    };

    const handleSubmitSertificateForm = async (event) => {
        event.preventDefault();
        // Логика отправки формы сертификатов
    };

    const handleSubmitBothForms = async (event) => {
        await handleSubmitMainForm(event);
        await handleSubmitSertificateForm(event);
    };

    return (
        <div className="create-course-container">
            <form onSubmit={handleSubmitMainForm}>
                <div className="course-content content-fix fix-width">
                    <div className="input-container">
                        <label className="floating-label" htmlFor="course-name">Название курса</label>
                        <input
                            className="form__input"
                            type="text"
                            name="course-name"
                            id="course-name"
                            maxLength="200"
                            ref={el => inputRefs.current[0] = el}
                        />
                    </div>
                </div>
                <div className="course-content fix-width">
                    <h2 className="course-content__title">Кто выдал</h2>
                    <div className="input-container">
                        <label className="floating-label" htmlFor="degree-info">Степень, процент прохождения и т.д.</label>
                        <input
                            className="form__input"
                            type="text"
                            name="degree-info"
                            id="degree-info"
                            ref={el => inputRefs.current[1] = el}
                            maxLength="200"
                        />
                    </div>
                    <div className="input-container">
                        <label className="floating-label" htmlFor="module-info">Модуль названия или иное</label>
                        <input
                            className="form__input"
                            type="text"
                            name="module-info"
                            id="module-info"
                            ref={el => inputRefs.current[2] = el}
                            maxLength="200"
                        />
                    </div>
                </div>
                <div className="course-content course-content-margin fix-width">
                    <div className="input-container">
                        <label className="floating-label " htmlFor="participant-name">ФИО участника</label>
                        <input
                            className="form__input"
                            type="text"
                            name="participant-name"
                            id="participant-name"
                            ref={el => inputRefs.current[3] = el}
                            maxLength="200"
                        />
                    </div>
                    <div className="input-container">
                        <label className="floating-label " htmlFor="position-info">Должность того, кто подтверждает</label>
                        <input
                            className="form__input"
                            type="text"
                            name="position-info"
                            id="position-info"
                            ref={el => inputRefs.current[4] = el}
                            maxLength="200"
                        />
                    </div>
                    <div className="input-container">
                        <label className="floating-label " htmlFor="issuer-name">ФИО, кто выдал</label>
                        <input
                            className="form__input"
                            type="text"
                            name="issuer-name"
                            id="issuer-name"
                            ref={el => inputRefs.current[5] = el}
                            maxLength="200"
                        />
                    </div>

                    <div className="input-container">
                        <label className="floating-label">Выбор арбитра</label>
                        <select className="form__input padding-fix">
                            <option>Арбитр А</option>
                        </select>
                    </div>

                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={el => inputRefs.current[6] = el}
                    />
                    <button
                        type="button"
                        className="upload-file-create-course submit-button auth__button"
                        data-file-index="6"
                        onClick={handleFileSelect}
                    >
                        Загрузить
                    </button>
                    <span className="upload-file-create-course__span">Загрузка фото, фона и т.д.</span>

                    {mainUploadMessage && <p className="upload-message">{mainUploadMessage}</p>}
                </div>
                <div className="create-sertificate__buttons-container">
                    <button onClick={handleSubmitBothForms} className="signature-button button-submit auth__button">Подпись</button>
                    <button onClick={handleSubmitBothForms} className="delete-draft-button button-submit auth__button">Удалить черновик</button>
                    <button onClick={handleSubmitBothForms} className="save-draft-button button-submit auth__button">Сохранить как черновик</button>
                    <button onClick={handleSubmitBothForms} className="ban-on-receiving-button button-submit auth__button">Запрет на получение</button>
                    <button onClick={handleSubmitBothForms} className="feedback-workers-button button-submit auth__button">Отзыв у сотрудника</button>
                </div>
            </form>
            <aside className="education__card">
                <form onSubmit={handleSubmitSertificateForm}>
                    <div className="education-content">
                        <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                        <h2 className="education-card__title">Загрузка фона, фото и т.д.</h2>
                        <div className="education-buttons">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={el => inputRefs.current[7] = el}
                            />
                            <button
                                type="button"
                                className="add-sertificate education__button button-submit auth__button"
                                data-file-index="7"
                                onClick={handleFileSelect}
                            >
                                Добавить
                            </button>
                            <button className="manage-sertificate education__button button-submit auth__button">Управлять</button>
                        </div>
                        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
                    </div>
                </form>
            </aside>
        </div>
    );
}

export default CreateSertificate;

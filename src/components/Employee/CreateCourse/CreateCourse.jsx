import React, { useEffect, useRef, useState } from "react";
import './CreateCourse.css';
import useBackgroundSetter from "../../../useBackgroundSetter";
import documentIcon from '../../../img/icons/document-icon.png';

function CreateCourse() {
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

    // Одна кнопка отправляет сразу две формы
    const handleSubmitBothForms = async (event) => {
        await handleSubmitMainForm(event);
        await handleSubmitSertificateForm(event);
    };

    return (
        <div className="create-course-container">
            <form onSubmit={handleSubmitMainForm}>
                <div className="course-content content-fix">
                    <div className="input-container">
                        <label className="floating-label" htmlFor="name-course">Название курса</label>
                        <input
                            className="form__input"
                            type="text"
                            name="name-course"
                            id="name-course"
                            maxLength='200'
                            ref={el => inputRefs.current[0] = el}
                        />
                    </div>
                    <div className="input-container textarea-container">
                        <label className="floating-label" htmlFor="descr-course">Описание</label>
                        <textarea
                            className="form__input form__textarea"
                            type="text"
                            name="descr-course"
                            id="descr-course"
                            maxLength='200'
                            ref={el => inputRefs.current[1] = el}
                        />
                    </div>
                </div>
                <div className="course-content">
                    <h2 className="course-content__title">Содержание, автособираемое из модулей</h2>
                    <div className="input-container">
                        <input className="course-content__checkbox" type="checkbox" name="name-module-course-check" />
                        <label className="floating-label label-with-checkbox" htmlFor="name-module-course">Название модуля</label>
                        <input className="form__input" type="text" name="name-module-course" id="name-module-coruse"
                            ref={el => inputRefs.current[2] = el}
                            maxLength='200'
                        />
                    </div>
                    <div className="input-container">
                        <input className="course-content__checkbox" type="checkbox" name="descr-module-course-check" />
                        <label className="floating-label label-with-checkbox" htmlFor="descr-module-course">Описание</label>
                        <input className="form__input" type="text" name="descr-module-course" id="descr-module-coruse"
                            ref={el => inputRefs.current[3] = el}
                            maxLength='200'
                        />
                    </div>

                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={el => inputRefs.current[4] = el}
                    />
                    <button
                        type="button"
                        className="upload-file-create-course submit-button auth__button"
                        data-file-index="4"
                        onClick={handleFileSelect}
                    >
                        Загрузить
                    </button>
                    <span className="upload-file-create-course__span">Загрузка видео, аудио, текстовых документов</span>

                    {mainUploadMessage && <p className="upload-message">{mainUploadMessage}</p>}
                </div>
                <button onClick={handleSubmitBothForms} className="create-button button-submit auth__button">Создать</button>
            </form>
            <aside className="education__card">
                <form onSubmit={handleSubmitSertificateForm}>
                    <div className="education-content">
                        <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                        <h2 className="education-card__title">Сертификаты</h2>
                        <div className="education-buttons">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={el => inputRefs.current[5] = el}
                            />
                            <button
                                type="button"
                                className="add-sertificate education__button button-submit auth__button"
                                data-file-index="5"
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

export default CreateCourse;

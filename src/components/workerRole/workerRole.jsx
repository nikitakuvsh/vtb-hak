import React, { useEffect, useRef, useState } from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import documentIcon from '../../img/icons/document-icon.png';

function WorkerRole() {
    useBackgroundSetter();
    const inputRefs = useRef([]);
    const [uploadMessage, setUploadMessage] = useState(''); // Сообщение о загрузке сертификата
    const [mainUploadMessage, setMainUploadMessage] = useState(''); // Сообщение о загрузке файла курса
    const fileInputRef = useRef(null);

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
    };

    const handleSubmitSertificateForm = async (event) => {
        event.preventDefault();
    };

    const handleSubmitBothForms = async (event) => {
        event.preventDefault();
        // Логика отправки формы
    };

    return (
        <div className="create-course-container">
            <form onSubmit={handleSubmitMainForm}>
                <div className="course-content content-fix fix-width">
                    <div className="input-container">
                        <label className="floating-label" htmlFor="current-position">Текущая должность</label>
                        <input
                            className="form__input"
                            type="text"
                            name="current-position"
                            id="current-position"
                            ref={el => inputRefs.current[0] = el}
                        />
                    </div>
                    <div className="input-container textarea-container">
                        <label className="floating-label" htmlFor="history">История</label>
                        <textarea
                            className="form__input form__textarea"
                            name="history"
                            id="history"
                            ref={el => inputRefs.current[1] = el}
                        />
                    </div>
                </div>
                <div className="course-content fix-width">
                    <div className="input-container">
                        <label className="floating-label" htmlFor="new-position">Новая должность</label>
                        <input
                            className="form__input"
                            type="text"
                            name="new-position"
                            id="new-position"
                            ref={el => inputRefs.current[2] = el}
                        />
                    </div>
                    <div className="input-container">
                        <label className="floating-label" htmlFor="approver-position">Должность того, кто подтверждает</label>
                        <input
                            className="form__input"
                            type="text"
                            name="approver-position"
                            id="approver-position"
                            ref={el => inputRefs.current[3] = el}
                        />
                    </div>
                    <div className="input-container">
                        <label className="floating-label" htmlFor="issuer-name">ФИО, кто выдал</label>
                        <input
                            className="form__input"
                            type="text"
                            name="issuer-name"
                            id="issuer-name"
                            ref={el => inputRefs.current[4] = el}
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
                <button onClick={handleSubmitBothForms} className="change-role-button create-button button-submit auth__button">Изменить</button>
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

export default WorkerRole;

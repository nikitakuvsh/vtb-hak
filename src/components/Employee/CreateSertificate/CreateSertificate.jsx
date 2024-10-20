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
                if (fileIndex === '6') {
                    setUploadMessage(`Сертификат "${fileName}" загружен.`);
                } else if (fileIndex === '6') {
                    setMainUploadMessage(`Файл "${fileName}" загружен.`);
                }
            };
        }
    };

    const handleSubmitMainForm = async (event) => {
        event.preventDefault();
        // Логика отправки основной формы
    };

	const handleSubmitBothForms = async (event) => {
		event.preventDefault();


		const formData = new FormData();
		const certFile = inputRefs.current[6]?.files[0];
		
		if (certFile) {
			formData.append("cert_name", inputRefs.current[0]?.value || ""); 
			formData.append("comment", inputRefs.current[1]?.value || ""); 
			formData.append("course_module", inputRefs.current[2]?.value || "");
			formData.append("reciever_email", inputRefs.current[3]?.value || "");
			formData.append("sender_job_title", inputRefs.current[4]?.value || "");
			formData.append("sender_email", inputRefs.current[5]?.value || "");
			formData.append("arbitrator", inputRefs.current[7]?.value || "");
			
			// if (fileInput.files[0]) {
			formData.append("cert_file", certFile);
			// }
			try {
				const response = await fetch(process.env.REACT_APP_BACK_API+'create_certificate', {
					method: 'POST',
					body: formData,
				});

				if (response.ok) {
					setMainUploadMessage("Файл курса и сертификат успешно загружены!");
				} else {
					setMainUploadMessage("Ошибка при загрузке файлов.");
				}
			} catch (error) {
				console.error('Ошибка:', error);
				setMainUploadMessage("Произошла ошибка при загрузке.");
			}
		} else {
			setMainUploadMessage("Файлы не выбраны.");
		}
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
                        <label className="floating-label" htmlFor="degree-info">Комментарий</label>
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
                        <label className="floating-label" htmlFor="module-info">Модуль курса</label>
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
                        <label className="floating-label " htmlFor="participant-name">E-mail сотрудника</label>
                        <input
                            className="form__input"
                            type="email"
                            name="participant-name"
                            id="participant-name"
                            ref={el => inputRefs.current[3] = el}
                            maxLength="200"
                        />
                    </div>
                    <div className="input-container">
                        <label className="floating-label " htmlFor="position-info">Должность подтверждающего</label>
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
                        <label className="floating-label " htmlFor="issuer-name">E-mail компании</label>
                        <input
                            className="form__input"
                            type="email"
                            name="issuer-name"
                            id="issuer-name"
                            ref={el => inputRefs.current[5] = el}
                            maxLength="200"
                        />
                    </div>

                    <div className="input-container">
                        <label className="floating-label">Выбор арбитра</label>
						<select
							className="form__input padding-fix"
							ref={el => inputRefs.current[7] = el} // хули ты мне реф не добавил то? я же не реактер, чтобы вкуривать что это нужно делать... минус 5 минут(((((
						>
							<option value="Арбитр А">Арбитр А</option>
							<option value="Арбитр Б">Арбитр Б</option>
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
            
        </div>
    );
}

export default CreateSertificate;

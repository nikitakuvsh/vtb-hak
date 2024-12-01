import React, { useState } from "react";
import './ChoiceWorkerModal.css';

function ChoiceModalWorker({ worker, onClose }) {
    const [isGradeConfirmed, setIsGradeConfirmed] = useState(worker.grade_proof || false);

    if (!worker) return null; // Если данные о работнике отсутствуют, ничего не рендерим

    // Полная информация о сотруднике
    const workerFullInfo = [
        { label: 'Обо мне', value: worker.about || 'Информация отсутствует' },
        { label: 'Дата рождения', value: worker.birth_date || 'Информация отсутствует' },
        { label: 'Город пребывания', value: worker.city || 'Информация отсутствует' },
        { label: 'Зарплатные ожидания', value: worker.salary_expectations_amount || 'Информация отсутствует' },
        { label: 'Навыки', value: worker.skills || 'Информация отсутствует' },
        { label: 'Направления собеседований', value: worker.direction || 'Информация отсутствует' },
        { label: 'Опыт работы', value: worker.work_experience || 'Информация отсутствует' },
        { label: 'Образование', value: worker.work_education || 'Информация отсутствует' },
        { label: 'Трудоустройство (официальное или нефициальное)', value: worker.work_type || 'Информация отсутствует' },
        { label: 'Предыдущие места работы', value: worker.work_prev_works || 'Информация отсутствует' },
        { label: 'Контактные данные', value: worker.contact || 'Информация отсутствует' },
    ];

    const handleSave = (e) => {
        e.preventDefault();
        // Заглушка для сохранения квалификации
        console.log("Квалификация подтверждена:", isGradeConfirmed);
        onClose();
    };

    return (
        <div className="modal-worker">
            <div className="modal-worker__overlay" onClick={onClose}></div>
            <div className="modal-worker__content">
                <button className="modal-worker__close" onClick={onClose}>×</button>
                <div className="modal-worker__details">
                    <img
                        className="modal-worker__image"
                        src={worker.icon}
                        alt={`Фотография ${worker.name}`}
                    />
                    <h2 className="modal-worker__name">{worker.name}</h2>

                    <table className="modal-worker__info-table">
                        <tbody>
                            {workerFullInfo.map((info, index) => (
                                <tr key={index} className="modal-worker__info-row">
                                    <td className="modal-worker__info-label">{info.label}:</td>
                                    <td className="modal-worker__info-value">{info.value}</td>
                                </tr>
                            ))}
                            <tr className="modal-worker__info-row">
                                <td className="modal-worker__info-label">Подтверждение квалификации:</td>
                                <td>
                                    <label className="modal-worker__checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={isGradeConfirmed}
                                            onChange={(e) => setIsGradeConfirmed(e.target.checked)}
                                            className="modal-worker__checkbox"
                                        />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="modal-worker__save-button" onClick={handleSave}>
                    Сохранить
                </button>
            </div>
        </div>
    );
}

export default ChoiceModalWorker;

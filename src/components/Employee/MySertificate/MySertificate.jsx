import React, { useState } from "react";
import useBackgroundSetter from "../../../useBackgroundSetter";
import workerIconCard from '../../../img/icons/worker-icon-card.svg'; // Убедитесь, что этот путь правильный

function MySertificate() {
    useBackgroundSetter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // Состояние для модального окна подтверждения
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [certificates, setCertificates] = useState([
        {
            id: 1,
            title: `Сертификат 1`,
        },
        {
            id: 2,
            title: `Сертификат 2`,
        },
    ]);

    const handleCardClick = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertificate(null);
    };

    const handleOpenConfirmDelete = () => {
        setIsConfirmDeleteOpen(true); // Открываем модальное окно подтверждения
    };

    const handleCloseConfirmDelete = () => {
        setIsConfirmDeleteOpen(false); // Закрываем модальное окно подтверждения
    };

    const handleDeleteCertificate = () => {
        setCertificates(prevCertificates => prevCertificates.filter(certificate => certificate.id !== selectedCertificate.id));
        handleCloseModal(); // Закрываем основное модальное окно после удаления
        handleCloseConfirmDelete(); // Закрываем окно подтверждения
    };

    return (
        <div className="cards__inner">
            {certificates.map(certificate => (
                <div
                    key={certificate.id}
                    className="worker__card"
                    onClick={() => handleCardClick(certificate)}
                    data-id={certificate.id}
                >
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">{certificate.title}</h2>
                    </div>
                </div>
            ))}

            {isModalOpen && selectedCertificate && (
                <div className="worker__card-modal">
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">{selectedCertificate.title}</h2>
                        <button className="accept-sertificate card-button">Подтверждение сертификата</button>
                        <button className="card-button">Изменить</button>
                        <button className="card-button" onClick={handleOpenConfirmDelete}>Удалить</button> {/* Открываем модальное окно подтверждения */}
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}

            {/* Модальное окно подтверждения удаления */}
            {isConfirmDeleteOpen && (
                <div className="confirm-delete-modal">
                    <div className="confirm-delete-content">
                        <h2>Вы уверены, что хотите удалить сертификат?</h2>
                        <div className="confirm-delete-buttons">
                            <button className="confirm-button" onClick={handleDeleteCertificate}>Да</button>
                            <button className="cancel-button" onClick={handleCloseConfirmDelete}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MySertificate;

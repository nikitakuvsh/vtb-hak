import React, { useState } from "react";
import useBackgroundSetter from "../../../useBackgroundSetter";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Импортируем иконки

function MySertificate() {
    useBackgroundSetter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // Состояние для модального окна подтверждения
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [certificates, setCertificates] = useState([
        {
            id: 1,
            title: `Сертификат 1`,
            description: `Описание 1`,
            issuedPerson: `Иванову Кириллу`,
            comment: `За прохождение ДПО,`,
            signatureArbitr: false,
            signatureCompany: false,
            transactionToken: '0000000000000e0000000000000'
        },
        {
            id: 2,
            title: `Сертификат 2`,
            description: `Описание 2`,
            issuedPerson: `Маргарите Романовне`,
            comment: `За проведение ДПО`,
            signatureArbitr: true,
            signatureCompany: true,
            transactionToken: '10213123hasj21231230088eeeee'
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
                        <p className="worker__card-description">{selectedCertificate.description}</p>
                        <p className="worker__card-description">Выдан {selectedCertificate.issuedPerson}</p>
                        <p className="worker__card-description">Комментарий {selectedCertificate.comment}</p>
                        <p className="worker__card-description">
                            Подпись арбитра {selectedCertificate.signatureArbitr ? (
                                <FaCheckCircle style={{ color: 'green', marginLeft: '8px' }} />
                            ) : (
                                <FaTimesCircle style={{ color: 'red', marginLeft: '8px' }} />
                            )}
                        </p>
                        <p className="worker__card-description">
                            Подпись компании {selectedCertificate.signatureCompany ? (
                                <FaCheckCircle style={{ color: 'green', marginLeft: '8px' }} />
                            ) : (
                                <FaTimesCircle style={{ color: 'red', marginLeft: '8px' }} />
                            )}
                        </p>
                        <p className="worker__card-description">Токен транзакции {selectedCertificate.transactionToken}</p>
                        <button className="accept-sertificate card-button">Подтверждение сертификата</button>
                        <button className="card-button">Изменить</button>
                        <button className="card-button" onClick={handleOpenConfirmDelete}>Удалить</button>
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}

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

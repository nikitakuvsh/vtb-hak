import React, { useState,useEffect } from "react";
import useBackgroundSetter from "../../../useBackgroundSetter";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function MySertificate() {
    useBackgroundSetter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [certificates, setCertificates] = useState([]);
	useEffect(() => {
		const postData = async () => {
			try {
				const response = await fetch(process.env.REACT_APP_BACK_API+'get_company_cretificates', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_id: localStorage.getItem('userId'),
					}),
				});

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				setCertificates(data.certificates);
			} catch (error) {
				console.error('Error fetching certificates:', error);
			}
		};

		postData();
	}, []);
	const handleConfirmSert = async (id) => {

		try {
			const payload = {
				cert_id: id,
				company_id: localStorage.getItem('userId')
			}
			console.log(id);
			
			const response = await fetch(process.env.REACT_APP_BACK_API+'confirm_certificate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const result = await response.json();
			if (response.ok) {
				alert('Сертификат успешно подтверждет!');
			} else {
				alert(`Ошибка: ${result.error || 'Не удалось удалить сертификат'}`);
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error);
			alert('Произошла ошибка при обновлении данных.');
		}
		handleCloseModal();
    };
    const handleCardClick = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertificate(null);
    };

    const handleOpenConfirmDelete = () => {
        setIsConfirmDeleteOpen(true);
    };

    const handleCloseConfirmDelete = () => {
        setIsConfirmDeleteOpen(false);
    };

    const handleDeleteCertificate = () => {
        setCertificates(prevCertificates => prevCertificates.filter(certificate => certificate.id !== selectedCertificate.id));
        handleCloseModal();
        handleCloseConfirmDelete();
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
                        <button className="accept-sertificate card-button" onClick={() => handleConfirmSert(selectedCertificate.id)}>Подтверждение сертификата</button>
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

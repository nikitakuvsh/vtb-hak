import React, { useEffect, useRef, useState } from "react";
import useBackgroundSetter from "../../../useBackgroundSetter";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Achieve.css';

function Achieve() {
    useBackgroundSetter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [certificates, setCertificates] = useState([ ]);

    const handleCardClick = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertificate(null);
    };
	const handleShareNFT = (certificate) => {
		const text = `Сертификат ${certificate.title}, токен транзакции: ${certificate.transactionToken}. Ссылка на NFT: https://sepolia.etherscan.io/tx/${certificate.NFT}`;
		const vkShareUrl = `https://vk.com/share.php?url=https://sepolia.etherscan.io/tx/${certificate.NFT}&title=Мой+NFT&comment=${encodeURIComponent(text)}`;
		
		window.open(vkShareUrl, '_blank');
	};
	const handleMintNFT = async (id, flag1, flag2, event) => {

		try {
			const payload = {
				cert_id: id,
				address: localStorage.getItem('userWalletAddress')
			}
			if (localStorage.getItem('userWalletAddress') == undefined){
				alert('Подключите кошелек');
				return 0;
			}
			//Врубить когда арбитра добавим
			// if (!flag1 || !flag2){
				// alert('Не хватает подписей');
				// return 0;
			// }
			const response = await fetch('http://92.53.64.89:8092/mint_nft', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const result = await response.json();
			if (response.ok) {
				alert('NFT успешно сминчен!');
			} else {
				alert(`Ошибка: ${result.error || 'Не удалось сминтить нфт'}`);
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error);
			alert('Произошла ошибка при обновлении данных.');
		}
    };
	
    const handleOpenConfirmDelete = () => {
        setIsConfirmDeleteOpen(true);
    };

    const handleCloseConfirmDelete = () => {
        setIsConfirmDeleteOpen(false);
    };
	useEffect(() => {
		const postData = async () => {
			try {
				const response = await fetch('http://92.53.64.89:8092/get_user_cretificates', {
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
                        <h2 className="worker__card-title">Сертификат: {certificate.title} </h2>
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
						<p className="worker__card-description">Ссылка на транзакцию {selectedCertificate.transactionLink}</p>
						<p className="worker__card-description">Ссылка на NFT https://sepolia.etherscan.io/tx/{selectedCertificate.NFT}</p>
						
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
						<button className="close-modal" onClick={() => handleMintNFT(selectedCertificate.id, selectedCertificate.signatureArbitr, selectedCertificate.signatureCompany)}>Сминтить NFT</button>
						<button className="close-modal" onClick={() => handleShareNFT(selectedCertificate)}>Поделиться NFT</button>

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

export default Achieve;

import React, { useState, useEffect } from "react";
import workerIconCard from '../../img/icons/worker-icon-card.svg';
import useBackgroundSetter from "../../useBackgroundSetter";
import './ChoiceEmployee.css';

function ChoiceEmployee() {
    useBackgroundSetter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const fetchWorkers = async () => {
            const response = await new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        { id: 1, title: 'КОМПАНИЯ 1', description: 'Описание 1', contactInfo: 'Телефон: 123456789, Email: company1@example.com' },
                        { id: 2, title: 'КОМПАНИЯ 2', description: 'Описание 2', contactInfo: 'Телефон: 987654321, Email: company2@example.com' },
                        { id: 3, title: 'КОМПАНИЯ 3', description: 'Описание 3', contactInfo: 'Телефон: 111222333, Email: company3@example.com' }
                    ]);
                }, 1000);
            });
            setWorkers(response);
        };

        fetchWorkers();
    }, []);

    const handleCardClick = (worker) => {
        setSelectedWorker(worker);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWorker(null);
        setIsContactModalOpen(false);
    };

    const handleContactClick = () => {
        setIsContactModalOpen(true);
    };

    return (
        <div className="cards__inner">
            {workers.map(worker => (
                <div
                    key={worker.id}
                    className="worker__card"
                    onClick={() => handleCardClick(worker)}
                    data-id={worker.id}
                >
                    <div className="worker__card--image-container">
                        <img className="worker__card-image" src={workerIconCard} alt="Логотип компании" />
                    </div>
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">{worker.title}</h2>
                        <p className="worker__card-descr">{worker.description}</p>
                    </div>
                </div>
            ))}

            {isModalOpen && selectedWorker && (
                <div className="worker__card-modal">
                    <div className="worker__card--image-container">
                        <img className="worker__card-image" src={workerIconCard} alt="Логотип компании" />
                    </div>
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">{selectedWorker.title}</h2>
                        <p className="worker__card-descr">{selectedWorker.description}</p>
                        <button className="card-button" onClick={handleContactClick}>Связаться с компанией</button>
                        <button className="card-button">Оставить отзыв</button>
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}

            {isContactModalOpen && selectedWorker && (
                <div className="contact-modal">
                    <h2>Контактные данные компании</h2>
                    <p>{selectedWorker.contactInfo}</p>
                    <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                </div>
            )}
        </div>
    );
}

export default ChoiceEmployee;

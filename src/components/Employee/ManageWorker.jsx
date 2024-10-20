import React, { useState, useEffect } from "react";
import './ChoiceWorker.css';
import workerIconCard from '../../img/icons/worker-icon-card.svg';
import useBackgroundSetter from "../../useBackgroundSetter";

function ManageWorker() {
    useBackgroundSetter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [workers, setWorkers] = useState([]);

    // Смотри ChoiceWorker
    useEffect(() => {
        const fetchWorkers = async () => {
            const response = await new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        { id: 1, title: 'ФИО 1', description: 'Описание 1' },
                        { id: 2, title: 'ФИО 2', description: 'Описание 2' },
                        { id: 3, title: 'ФИО 3', description: 'Описание 3' }
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

    const handleFeedbackClick = () => {
        setIsFeedbackModalOpen(true);
    };

    const handleContactClick = () => {
        setIsContactModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWorker(null);
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
        setSelectedWorker(null);
    };

    const handleCloseContactModal = () => {
        setIsContactModalOpen(false);
        setSelectedWorker(null);
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
                        <button className="card-button button-worker-role" onClick={() => window.location.href = `/worker-role/${localStorage.getItem('userId')}`}>Должность</button>
                        <button className="card-button" onClick={handleFeedbackClick}>Запросить отзыв</button>
                        <button className="card-button" onClick={handleContactClick}>Связаться с сотрудником</button>
                        <button className="card-button">Достижения</button>
                        <button className="card-button button-kick">Уволить</button>
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}

            {isFeedbackModalOpen && selectedWorker && (
                <div className="worker__card-modal">
                    <div className="worker__card--image-container">
                        <img className="worker__card-image" src={workerIconCard} alt="Логотип компании" />
                    </div>
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">Обратная связь для {selectedWorker.title}</h2>
                        <p className="worker__card-descr">Запросите отзыв от данного сотрудника.</p>
                        <button className="close-modal" onClick={handleCloseFeedbackModal}>Закрыть</button>
                    </div>
                </div>
            )}

            {isContactModalOpen && selectedWorker && (
                <div className="worker__card-modal">
                    <div className="worker__card--image-container">
                        <img className="worker__card-image" src={workerIconCard} alt="Логотип компании" />
                    </div>
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">Контактные данные {selectedWorker.title}</h2>
                        <p className="worker__card-descr">Телефон: +123456789</p>
                        <p className="worker__card-descr">Email: example@example.com</p>
                        <button className="close-modal" onClick={handleCloseContactModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageWorker;

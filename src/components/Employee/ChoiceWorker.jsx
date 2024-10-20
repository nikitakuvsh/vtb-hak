import React, { useState, useEffect } from "react";
import './ChoiceWorker.css';
import workerIconCard from '../../img/icons/worker-icon-card.svg';
import useBackgroundSetter from "../../useBackgroundSetter";

function ChoiceWorker() {
    useBackgroundSetter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [workers, setWorkers] = useState([]);

    // Тут данные с сервера
    useEffect(() => {
        // В реальности тут будет fetch('/api/workers') или другой запрос к серверу
        const fetchWorkers = async () => {
            // Заглушка
            const response = await new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        { id: 1, title: 'ФИО 1', description: 'Описание 1', contact: 'contact1@example.com' },
                        { id: 2, title: 'ФИО 2', description: 'Описание 2', contact: 'contact2@example.com' },
                        { id: 3, title: 'ФИО 3', description: 'Описание 3', contact: 'contact3@example.com' }
                    ]);
                }, 1000); // Тут типа сервер ответил через секунду, сет таймаут можно убрать
            });
            setWorkers(response);
        };

        fetchWorkers();
    }, []); // Зависимость [] означает, что запрос выполнится один раз при монтировании компонента

    const handleCardClick = (worker) => {
        setSelectedWorker(worker);
        setIsModalOpen(true);
    };

    const handleContactClick = () => {
        setIsContactModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                        <button className="card-button" onClick={handleContactClick}>Связаться с сотрудником</button>
                        <button className="card-button">Пригласить</button>
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}

            {isContactModalOpen && selectedWorker && (
                <div className="worker__card-modal">
                    <div className="worker__card--image-container">
                        <img className="worker__card-image" src={workerIconCard} alt="Логотип компании" />
                    </div>
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">Контактные данные сотрудника</h2>
                        <p className="worker__card-descr">Email: {selectedWorker.contact}</p>
                        <button className="close-modal" onClick={handleCloseContactModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChoiceWorker;

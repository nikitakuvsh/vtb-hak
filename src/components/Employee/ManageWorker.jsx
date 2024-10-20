import React, { useState, useEffect } from "react";
import './ChoiceWorker.css';
import workerIconCard from '../../img/icons/worker-icon-card.svg';
import useBackgroundSetter from "../../useBackgroundSetter";

function ManageWorker() {
    useBackgroundSetter();

    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                        <button className="card-button">Связаться с сотрудником</button>
                        <button className="card-button">Запросить отзыв</button>
                        <button className="card-button">Достижения</button>
                        <button className="card-button button-kick">Уволить</button>
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageWorker;

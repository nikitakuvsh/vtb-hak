import React, { useState } from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import defaultWorkerIcon from '../../img/icons/header-default-user-icon.png';
import ChoiceModalWorker from "./ChoiceWorkerModal";
import './ChoiceWorker.css';

function ChoiceWorker() {
    useBackgroundSetter();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (worker) => {
        setSelectedWorker(worker);
        setModalOpen(true);
    };
    

    const closeModal = () => {
        setSelectedWorker(null);
        setModalOpen(false);
    }

    const workers = [
        {
            id: 1,
            name: "Андрей Павлов",
            age: 22,
            role: "Frontend-разработчик",
            experience: 1,
            similarity: 85, // Процент схожести
            icon: defaultWorkerIcon,
        },
        {
            id: 2,
            name: "Мария Иванова",
            age: 25,
            role: "UI/UX дизайнер",
            experience: 2,
            similarity: 72,
            icon: defaultWorkerIcon,
        },
        {
            id: 3,
            name: "Олег Сидоров",
            age: 30,
            role: "Backend-разработчик",
            experience: 5,
            similarity: 50,
            icon: defaultWorkerIcon,
        },
        {
            id: 4,
            name: "Елена Кузнецова",
            age: 28,
            role: "Project Manager",
            experience: 4,
            similarity: 78,
            icon: defaultWorkerIcon,
        },
        {
            id: 5,
            name: "Владимир Петров",
            age: 35,
            role: "DevOps инженер",
            experience: 7,
            similarity: 40,
            icon: defaultWorkerIcon,
        }
    ];

    const filteredWorkers = workers
        .filter(worker =>
            worker.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.similarity - a.similarity);

    const getClassBySimilarity = (similarity) => {
        if (similarity >= 75) return "worker--suitable";
        if (similarity >= 50) return "worker--average";
        return "worker--unsuitable";
    };

    const getTextBySimilarity = (similarity) => {
        if (similarity >= 75) return "Наиболее подходящий";
        if (similarity >= 50) return "Менее подходящий";
        return "Неподходящий";
    };


    return (
        <div className="choice-worker__container">
            <div className="choice-worker__search">
                <input
                    type="text"
                    className="choice-worker__search-input"
                    placeholder="Введите имя работника..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredWorkers.length > 0 ? (
                <div className="worker-resume-grid">
                    {filteredWorkers.map((worker) => (
                        <div
                            key={worker.id}
                            className={`worker-resume-block`}
                            onClick={() => openModal(worker)}
                        >
                            <div className={`worker-resume-block__points ${getClassBySimilarity(worker.similarity)}`}>
                                <p className="worker-resume-block__points-text">{getTextBySimilarity(worker.similarity)}</p>
                            </div>
                            <div className="worker-resume__icon">
                                <img
                                    className="worker-resume__icon-image"
                                    src={worker.icon}
                                    alt={`Фотография ${worker.name}`}
                                />
                            </div>
                            <div className="worker-resume__description">
                                <h2 className="worker-resume__name">{worker.name}</h2>
                                <p className="worker-resume__description-text">{worker.age} лет</p>
                                <p className="worker-resume__description-text">{worker.role}</p>
                                <p className="worker-resume__description-text">{worker.experience} {worker.experience % 10 < 5 && worker.experience % 10 != 0 ? 'года' : 'лет'} опыта</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="choice-worker__no-results">Работники не найдены</p>
            )}
            {isModalOpen && (
                <ChoiceModalWorker
                    worker={selectedWorker}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default ChoiceWorker;

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

    useEffect(() => {
	fetch(process.env.REACT_APP_BACK_API+'workers_list')
			.then(response => response.json())
			.then(data => setWorkers(data.workers));
	}, []);

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
	const handleRecruit = async (id, company_id) => {

		try {
			const payload = {
				user_id: id,
				company_id: company_id
			}

			//Врубить когда арбитра добавим
			// if (!flag1 || !flag2){
				// alert('Не хватает подписей');
				// return 0;
			// }
			const response = await fetch(process.env.REACT_APP_BACK_API+'recruit_worker', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const result = await response.json();
			if (response.ok) {
				alert('Вы успешно наняли сотрудника!');
			} else {
				alert(`Ошибка: ${result.error || 'Не удалось нанять сотрудника (((('}`);
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error);
			alert('Произошла ошибка при обновлении данных.');
		}
		handleCloseModal();
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
                        <button className="card-button" onClick={() => handleRecruit(selectedWorker.id, localStorage.getItem('userId'))}>Пригласить</button>
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

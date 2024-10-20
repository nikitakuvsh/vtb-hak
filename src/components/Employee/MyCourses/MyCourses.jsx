import React, { useState } from "react";
import useBackgroundSetter from "../../../useBackgroundSetter";
import workerIconCard from '../../../img/icons/worker-icon-card.svg'; // Убедитесь, что этот путь правильный
import './MyCourses.css';

function MyCourses() {
    useBackgroundSetter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    
    const [courses, setCourses] = useState(() => {
        // Получаем данные из localStorage
        const courseName = localStorage.getItem('course_name');
        const courseDescription = localStorage.getItem('course_description');
        const courseId = localStorage.getItem('course_creater');

        // Проверяем, есть ли данные в localStorage, и создаем новый массив
        const storedCourses = [];
        if (courseName && courseDescription && courseId) {
            storedCourses.push({
                id: courseId, // Используем courseId как уникальный идентификатор
                title: courseName,
                description: courseDescription
            });
        }

        // Возвращаем массив, включающий существующие курсы и новые курсы из localStorage
        return [
            ...storedCourses,
            {
                id: 1,
                title: `Курс 1`,
                description: `Описание курса 1`
            },
            {
                id: 2,
                title: `Курс 2`,
                description: `Описание курса 2`
            },
        ];
    });

    const handleCardClick = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const handleShareCourse = () => {
        if (selectedCourse) {
            const link = `http://localhost:3000/course/${selectedCourse.id}`;
            navigator.clipboard.writeText(link)
                .then(() => {
                    alert('Ссылка на курс скопирована в буфер обмена!');
                })
                .catch(err => {
                    console.error('Ошибка при копировании ссылки:', err);
                });
        }
    };

    const handleOpenConfirmDelete = () => {
        setIsConfirmDeleteOpen(true);
    };

    const handleCloseConfirmDelete = () => {
        setIsConfirmDeleteOpen(false);
    };

    const handleDeleteCourse = () => {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== selectedCourse.id));
        handleCloseModal();
        handleCloseConfirmDelete();
    };

    return (
        <div className="cards__inner">
            {courses.map(course => (
                <div
                    key={course.id}
                    className="worker__card"
                    onClick={() => handleCardClick(course)}
                    data-id={course.id}
                >
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">{course.title}</h2>
                        <p className="worker__card-descr">{course.description}</p>
                    </div>
                </div>
            ))}

            {isModalOpen && selectedCourse && (
                <div className="worker__card-modal">
                    <div className="worker__card-content">
                        <h2 className="worker__card-title">{selectedCourse.title}</h2>
                        <p className="worker__card-descr">{selectedCourse.description}</p>
                        <button className="card-button" onClick={handleShareCourse}>Поделиться курсом</button>
                        <button className="card-button">Изменить</button>
                        <button className="card-button" onClick={handleOpenConfirmDelete}>Удалить</button>
                        <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}

            {isConfirmDeleteOpen && (
                <div className="confirm-delete-modal">
                    <div className="confirm-delete-content">
                        <h2>Вы уверены, что хотите удалить курс?</h2>
                        <div className="confirm-delete-buttons">
                            <button className="confirm-button" onClick={handleDeleteCourse}>Да</button>
                            <button className="cancel-button" onClick={handleCloseConfirmDelete}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyCourses;

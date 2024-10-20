import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBackgroundSetter from "../../../useBackgroundSetter";

function InviteCourse({ courses }) {
    useBackgroundSetter();
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Выводим отладочную информацию
    console.log("Courses:", courses);
    console.log("courseId:", courseId);

    // Находим курс по ID
    const course = courses.find(course => course.id === parseInt(courseId, 10));

    const handleAccept = () => {
        console.log("Курс принят:", course ? course.title : "Курс не найден");
        // Здесь вы можете добавить дополнительную логику для обработки принятия курса
    };

    if (!course) {
        return <h2>Курс не найден</h2>;
    }

    return (
        <div className="invite-course">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <button onClick={handleAccept}>Принять</button>
            <button onClick={() => navigate("/")}>Назад</button>
        </div>
    );
}

export default InviteCourse;

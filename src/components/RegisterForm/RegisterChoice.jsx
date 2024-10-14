import React from "react";
import './RegisterChoice.css';
import userIcon from '../../img/user.png';
import { Link } from 'react-router-dom';

function RegisterChoice(){
    return (
        <div className="choice-container">
            <div className="choice__employee">
                <Link to="/register-employee">
                    <img className="choice__icon employee__icon" src={userIcon} alt="Иконка пользователя" />
                    <h2 className="choice__title">Работодатель</h2>
                </Link>
            </div>

            <div className="choice-divider"></div>

            <div className="choice__worker">
                <Link to="/register-worker">
                    <img className="choice__icon worker__icon" src={userIcon} alt="Иконка пользователя" />
                    <h2 className="choice__title">Сотрудник</h2>
                </Link>
            </div>
        </div>
    );
}

export default RegisterChoice;

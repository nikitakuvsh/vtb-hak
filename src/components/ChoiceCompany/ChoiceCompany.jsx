import React, { useState } from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import defaultCompanyIcon from '../../img/icons/company-icon.svg';
import ChoiceCompanyModal from "./ChoiceCompanyModal";
import './ChoiceCompany.css';

function ChoiceCompany() {
    useBackgroundSetter();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSelectCompany = (company) => {
        setSelectedCompany(company);
        setModalOpen(true);
};

    // Список компаний (можно расширить)
    const companies = [
        {
            id: 1,
            name: "JeekBrains",
            description: "Мы ищем опытных Middle программистов React от 3-х лет опыта работы",
            salary: "10.000$",
            icon: defaultCompanyIcon
        },
        {
            id: 2,
            name: "TechCorp",
            description: "Разработка SaaS решений для бизнеса. Требуется Frontend разработчик",
            salary: "8.000$",
            icon: defaultCompanyIcon
        },
        {
            id: 3,
            name: "InnoSoft",
            description: "Наша компания разрабатывает AI-приложения. Нужен Senior Backend Developer",
            salary: "12.000$",
            icon: defaultCompanyIcon
        }
    ];

    // Фильтрация компаний по названию
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="choice-company__container">
            {/* Поле для поиска */}
            <div className="choice-company__search">
                <input
                    type="text"
                    className="choice-company__search-input"
                    placeholder="Введите название компании..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Список компаний */}
            {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                    <div key={company.id} className="choice-company__block" onClick={() => handleSelectCompany(company)}>
                        <div className="choice-company__logo">
                            <img
                                className="choice-company__logo-image"
                                src={company.icon}
                                alt="Иконка компании"
                            />
                        </div>
                        <div className="choice-company__description">
                            <h2 className="choice-company__name">{company.name}</h2>
                            <p className="choice-company__description-text">{company.description}</p>
                            <p className="choice-company__description-text salary">{company.salary}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="choice-company__no-results">Компании не найдены</p>
            )}

            {modalOpen && (
                <ChoiceCompanyModal
                    company={selectedCompany}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}

export default ChoiceCompany;

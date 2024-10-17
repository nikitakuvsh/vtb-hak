import React, { useState } from 'react';
import './Wallet.css';
import useBackgroundSetter from "../../useBackgroundSetter";
import visaIcon from '../../img/icons/visa-icon.png';
import mastercardIcon from '../../img/icons/mastercard-icon.png';
import qiwiIcon from '../../img/icons/qiwi-icon.png';
import mirIcon from '../../img/icons/mir-icon.png';

function Wallet() {
    useBackgroundSetter();
    
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState(null);
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [isValid, setIsValid] = useState(true);

    const getCardType = (number) => {
        const firstDigit = number[0];
        if (firstDigit === '4') return 'VISA';
        if (firstDigit === '5') return 'MASTERCARD';
        if (firstDigit === '2') return 'MIR';
        return 'QIWI';
    };

    const isValidCardNumber = (number) => {
        let sum = 0;
        let shouldDouble = false;

        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }
        
        return sum % 10 === 0;
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 16);
        const formattedCardNumber = input.match(/.{1,4}/g)?.join(' ') || '';
        setCardNumber(formattedCardNumber);

        const plainNumber = input;
        if (plainNumber.length >= 4) {
            setCardType(getCardType(plainNumber));
            setIsValid(isValidCardNumber(plainNumber));
        } else {
            setCardType(null);
            setIsValid(true);
        }
    };

    const handleExpiryDateChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 4);
        let formattedDate = input;
        if (input.length > 2) {
            formattedDate = `${input.substring(0, 2)}/${input.substring(2)}`;
        }
        setExpiryDate(formattedDate);
    };

    const handleCvcChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 3);
        setCvc(input);
    };

    const getCardIcon = () => {
        if (cardType === 'VISA') return visaIcon;
        if (cardType === 'MASTERCARD') return mastercardIcon;
        if (cardType === 'MIR') return mirIcon;
        return qiwiIcon;
    };

    return (
        <div className="wallet-container">
            <div className="wallet__input-container">
                <label className='wallet__label' htmlFor='wallet-email'>Почта</label>
                <input className='wallet__input' type='email' name='wallet-email' id='wallet-email' placeholder='example@gmail.com'></input>
            </div>
            <div className='info-about-card'>
                <div className='wallet__input-container input--fix'>
                    <label className='wallet__label' htmlFor='num-card'>Информация о карте</label>
                    <input 
                        className={`wallet__input ${!isValid ? 'wallet__input--invalid' : ''}`} 
                        type='text' 
                        name='num-card' 
                        id='num-card' 
                        placeholder='0000 0000 0000 0000' 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                    />
                    {cardType && <img src={getCardIcon()} alt={cardType} className="wallet__card-icon" />}
                </div>
                <div className='wallet__input-container input--inline-flex'>
                    <input 
                        className='wallet__input' 
                        type='text' 
                        name='date-card' 
                        id='date-card' 
                        placeholder='MM/YY' 
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        maxLength="5"
                    />
                </div>
                <div className='wallet__input-container input--inline-flex'>
                    <input 
                        className='wallet__input' 
                        type='password' 
                        name='cvc-card' 
                        id='cvc-card' 
                        placeholder='CVC' 
                        value={cvc}
                        onChange={handleCvcChange}
                        maxLength="3"
                    />
                </div>
                <div className='wallet__input-container'>
                    <label className='wallet__label' htmlFor='name-person'>Название карты</label>
                    <input className='wallet__input' type='text' name='name-person' id='name-person' placeholder='Имя'></input>
                </div>
            </div>
            <button className='wallet__add-card'>Добавить карту</button>
        </div>
    );
}

export default Wallet;

import React, { useState } from 'react';
import './Wallet.css';
import useBackgroundSetter from "../../useBackgroundSetter";

function Wallet() {
    useBackgroundSetter();
    
    return (
        <h1>Тут должен быть кошелёк :)</h1>
    );
}

export default Wallet;

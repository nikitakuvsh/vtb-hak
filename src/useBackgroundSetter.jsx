import { useEffect } from 'react';

const useBackgroundSetter = () => {
    useEffect(() => {
        document.body.style.background = 'white';
        
        // Установка стилей
        document.documentElement.style.setProperty('--linkColor', '#000');
        document.documentElement.style.setProperty('--buttonTextColor', '#000');
        document.documentElement.style.setProperty('--mainTitleColor', '#000');
        document.documentElement.style.setProperty('--authButtonColorText', '#fff');
        document.documentElement.style.setProperty('--authButtonBackground', '#2148C0');
        
        // Добавление новых переменных
        document.documentElement.style.setProperty('--floatingLabelColorText', '#fff');
        document.documentElement.style.setProperty('--formInputColor', '1px solid #FFF');
        document.documentElement.style.setProperty('--floatingLabelColorTextInverted', '#000');
        document.documentElement.style.setProperty('--formInputColorInverted', '1px solid #000');

        return () => {
            // Восстановление стилей при размонтировании
            document.documentElement.style.setProperty('--linkColor', '#fff');
            document.documentElement.style.setProperty('--buttonTextColor', '#fff');
            document.documentElement.style.setProperty('--mainTitleColor', '#fff');
            document.documentElement.style.setProperty('--authButtonColorText', '#2148C0');
            document.documentElement.style.setProperty('--authButtonBackground', '#fff');

            // Восстановление новых переменных
            document.documentElement.style.setProperty('--floatingLabelColorText', '#000');
            document.documentElement.style.setProperty('--formInputColor', '1px solid #000');
            document.documentElement.style.setProperty('--floatingLabelColorTextInverted', '#fff');
            document.documentElement.style.setProperty('--formInputColorInverted', '1px solid #fff');
        };
    }, []);
};

export default useBackgroundSetter;

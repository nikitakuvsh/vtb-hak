import { useEffect } from 'react';

const useBackgroundSetter = () => {
    useEffect(() => {
        document.body.style.background = 'white';
        document.documentElement.style.setProperty('--linkColor', '#000');
        document.documentElement.style.setProperty('--buttonTextColor', '#000');
        document.documentElement.style.setProperty('--mainTitleColor', '#000');
        document.documentElement.style.setProperty('--authButtonColorText', '#fff');
        document.documentElement.style.setProperty('--authButtonBackground', '#2148C0');

        return () => {
            document.documentElement.style.setProperty('--linkColor', '#fff');
            document.documentElement.style.setProperty('--buttonTextColor', '#fff');
            document.documentElement.style.setProperty('--mainTitleColor', '#fff');
            document.documentElement.style.setProperty('--authButtonColorText', '#2148C0');
            document.documentElement.style.setProperty('--authButtonBackground', '#fff');
        };
    }, []);
};

export default useBackgroundSetter;

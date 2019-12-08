import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        document.addEventListener('touchend', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('touchend', handleClick, true);
        };
    });
};

export default useOutsideClick;

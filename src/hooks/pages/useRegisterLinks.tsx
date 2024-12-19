import { useEffect, useState } from 'react';
import { useLinksService } from '..';


// Hook para a página RegisterLinks e para o Hook useCardRegisterLinks
export const useRegisterLinks = () => {
    const [counterLinks, setCounterLinks] = useState<number[]>([]);
    const {
        linksUserAuthenticated = [],
        isLoadinglinkAuthenticated
    } = useLinksService();

    useEffect(() => {
        // O _ é usado para indicar que o valor de cada elemento do array não está sendo utilizado (só o índice está sendo relevante nesse caso).
        setCounterLinks(linksUserAuthenticated.map((_, index) => index + 1));
    }, [linksUserAuthenticated]);

    const addCard = () => {
        if (counterLinks.length <= 4)
            setCounterLinks(prev => [...prev, prev.length + 1]);
    };
    const removeCard = () => {
        setCounterLinks(prev => prev.slice(0, -1));
    };

    return {
        counterLinks,
        addCard,
        removeCard,

        linksUserAuthenticated,
        isLoadinglinkAuthenticated
    }
};

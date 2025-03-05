import { useEffect, useState } from 'react';
import { IPostAndPutLink } from '../../interfaces';
import { useLinksService } from '../../hooks';

// Hook para a página RegisterLinks
export const useRegisterLinks = () => {
    const [counterLinks, setCounterLinks] = useState<number[]>([]);

    const {
        linksUserAuthenticated = [],
        createLink,
        updateLink,
        deleteLink,

        isLoadinglinkAuthenticated,
        isSuccessCreateLink,
        isErrorCreateLink,
        isErrorUpdateLink,
        isSuccessUpdateLink
    } = useLinksService();

    useEffect(() => {
        // Mapeia o array linksUserAuthenticated para criar um novo array de números,
        // representando o contador dos links, incrementando de 1 até o número de links.
        const newCounterLinks = linksUserAuthenticated?.map((_, index) => index + 1);

        // Verifica se o novo array (newCounterLinks) é diferente do estado anterior (counterLinks).
        // A comparação é feita convertendo ambos os arrays em strings com JSON.stringify.
        // Isso é necessário para evitar loops infinitos de atualização de estado.
        if (JSON.stringify(newCounterLinks) !== JSON.stringify(counterLinks)) {
            // Se o valor foi alterado, atualiza o estado de counterLinks.
            setCounterLinks(newCounterLinks);
        }
    }, [linksUserAuthenticated]); // Este efeito é disparado sempre que linksUserAuthenticated muda.

    const CardLimit = 5;  // Limite de cards que podem ser adicionados
    const addCard = () => {
        if (counterLinks.length < CardLimit)
            setCounterLinks(prev => [...prev, prev.length + 1]);
    };

    const handleSaveOrUpdateLink = (id: string, linkData: IPostAndPutLink) => {
        if (id) {
            updateLink({ id, linkData });
        } else {
            createLink(linkData);
        }
    };

    const removeCard = () => {
        setCounterLinks(prev => prev.slice(0, -1));
    };
    const handleDeleteLink = (id: string) => {
        id && deleteLink(id);
        removeCard();
    };

    return {
        handleSaveOrUpdateLink,
        handleDeleteLink,
        addCard,
        counterLinks,

        linksUserAuthenticated,
        isLoadinglinkAuthenticated,
        isSuccessCreateLink,
        isErrorCreateLink,
        isErrorUpdateLink,
        isSuccessUpdateLink
    }
};

import { useEffect, useState } from 'react';
import { IPostAndPutLink } from '../../interfaces';
import { useLinksService } from '../../hooks';

// Hook para a página RegisterLinks
export const useRegisterLinks = () => {
    const [counterLinks, setCounterLinks] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        // O _ é usado para indicar que o valor de cada elemento do array não está sendo utilizado (só o índice está sendo relevante nesse caso).
        // Atualiza o contador de links com base no número de links autenticados
        setCounterLinks(linksUserAuthenticated?.map((_, index) => index + 1));
    }, [linksUserAuthenticated]);


    const CardLimit = 5;  // Limite de cards que podem ser adicionados
    const addCard = () => {
        if (counterLinks.length < CardLimit)
            setCounterLinks(prev => [...prev, prev.length + 1]);
    };

    const removeCard = () => {
        setCounterLinks(prev => prev.slice(0, -1));
    };

    const handleSaveOrUpdateLink = (id: string, linkData: IPostAndPutLink) => {
        if (id) {
            updateLink({ id, linkData });
        } else {
            createLink(linkData);
        }
    };
    const handleDeleteLink = (id: string) => {
        deleteLink(id);
        removeCard();
        setIsModalOpen(false);
    };
    return {
        handleSaveOrUpdateLink,
        handleDeleteLink,
        addCard,
        counterLinks,
        isModalOpen,
        setIsModalOpen,

        linksUserAuthenticated,
        isLoadinglinkAuthenticated,
        isSuccessCreateLink,
        isErrorCreateLink,
        isErrorUpdateLink,
        isSuccessUpdateLink
    }
};

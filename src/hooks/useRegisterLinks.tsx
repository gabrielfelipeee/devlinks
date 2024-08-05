import { useEffect, useState } from "react";
import { useLinks } from "../context/LinksContext";

const useRegisterLinks = () => {
    const { linksUserAuthenticated = [] } = useLinks();
    const [counterLinks, setCounterLinks] = useState<number[]>([]);

    useEffect(() => {
        if (linksUserAuthenticated?.length > 0) {
            setCounterLinks(linksUserAuthenticated.map((_, index) => index));
        }
    }, [linksUserAuthenticated]);
    
    const addCard = () => {
        setCounterLinks(prev => [...prev, prev.length]);
    };
    const removeCard = () => {
        setCounterLinks(prev => prev.slice(0, -1));
    };

    return {
        counterLinks,
        addCard,
        removeCard
    }
};
export default useRegisterLinks;

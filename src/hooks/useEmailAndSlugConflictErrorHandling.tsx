import { useEffect, useState } from "react";
import { IError } from "../interfaces";

interface IUseEmailAndSlugConflictErrorHandlingProps {
    watchEmail?: any,
    watchSlug?: any,
    error: IError
}

export const useEmailAndSlugConflictErrorHandling = ({ watchEmail, watchSlug, error }: IUseEmailAndSlugConflictErrorHandlingProps) => {
    const [customErrorMessage, setCustomErrorMessage] = useState({
        email: "",
        slug: ""
    });

    useEffect(() => {
        if (error?.response?.data?.status === 409) {
            const message = (error.response.data.detail).toLocaleLowerCase();
            if (message.includes("email")) {
                setCustomErrorMessage({ slug: "", email: message });
            }
            else if (message.includes("slug")) {
                setCustomErrorMessage({ slug: message, email: "" });
            }
        }
    }, [error]);

    useEffect(() => {
        setCustomErrorMessage(prev => ({ slug: prev.slug, email: "" }));
    }, [watchEmail]);

    useEffect(() => {
        setCustomErrorMessage(prev => ({ slug: "", email: prev.email }));
    }, [watchSlug]);

    return { customErrorMessage }
};

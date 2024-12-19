import { useEffect, useState } from 'react';
import { useCustomForm, useLinksService, useRegisterLinks } from '../../hooks';
import { postAndPutLinkSchema } from '../../schemas';
import { IGetLink, IPostAndPutLink } from '../../interfaces';

interface IUseCardRegisterLinksProps {
    idLink: string,
    currentLink: IGetLink
};


// Hook para o componente CardRegisterLinks
export const useCardRegisterLinks = ({
    idLink,
    currentLink
}: IUseCardRegisterLinksProps) => {
    const [disabledButton, setDisabledButton] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        createLink,
        isSuccessCreateLink,
        isErrorCreateLink,
        updateLink,
        isSuccessUpdateLink,
        isErrorUpdateLink,
        deleteLink
    } = useLinksService();
    const {
        removeCard
    } = useRegisterLinks();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useCustomForm({ schema: postAndPutLinkSchema });
    const watchLink = watch('link');
    const watchPlatform = watch('platform');

    useEffect(() => {
        reset({
            'platform': currentLink?.platform || "",
            'link': currentLink?.link || ""
        });
    }, [currentLink]);

    useEffect(() => {
        if (watchLink === currentLink?.link && watchPlatform === currentLink?.platform) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }

    }, [watchLink, watchPlatform, currentLink]);

    const onSubmit = (data: IPostAndPutLink, id: string) => {
        if (id?.length > 0) {
            updateLink({ ...data, id });
        } else {
            createLink(data);
        }
    };

    const handleRemove = () => {
        removeCard();
        idLink && deleteLink(idLink);
        setIsModalOpen(false);
    };

    return {
        control,
        errors,
        handleSubmit,

        onSubmit,
        handleRemove,

        disabledButton,
        isModalOpen,
        setIsModalOpen,

        isSuccessCreateLink,
        isErrorCreateLink,

        isSuccessUpdateLink,
        isErrorUpdateLink
    }
}

import { useEffect, useState } from 'react';
import { useCustomForm, useLinksService, useRegisterLinks } from '../../hooks';
import { postAndPutLinkSchema } from '../../schemas';
import { IGetLink, IPostAndPutLink } from '../../interfaces';

interface IUseCardRegisterLinksProps {
    linkId: string,
    currentLink: IGetLink
};


// Hook para o componente CardRegisterLinks
export const useCardRegisterLinks = ({
    linkId,
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

    const onSubmit = (id: string, linkData: IPostAndPutLink) => {
        if (id?.length > 0) {
            updateLink({ id, linkData });
        } else {
            createLink(linkData);
        }
    };

    const handleRemove = () => {
        removeCard();
        linkId && deleteLink(linkId);
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

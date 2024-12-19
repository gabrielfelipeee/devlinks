import { useEffect, useState } from 'react';
import defaultAvatar from '../../assets/user.png';
import { useCustomForm, useUsersService } from '../../hooks';
import { putUserSchema } from '../../schemas';


// Hook para página Profile
export const useProfile = () => {
    const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);
    const [disabledButton, setDisabledButton] = useState(false);
    const { userAuthenticated } = useUsersService();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useCustomForm({ schema: putUserSchema });
    const nameWatch = watch('name');
    const emailWatch = watch('email');
    const slugWatch = watch('slug');
    const avatarWatch = watch('avatar');

    useEffect(() => {
        if (userAuthenticated) {
            reset({
                'name': userAuthenticated.name || "",
                'email': userAuthenticated.email || "",
                'slug': userAuthenticated.slug || "",
                'avatar': userAuthenticated.avatar || ""
            });
        };

        setImagePreview(
            userAuthenticated?.avatar != null
                ? userAuthenticated.avatar
                : defaultAvatar
        );
    }, [userAuthenticated]);

    // Muda a imagem enquanto o user digita a url
    useEffect(() => {
        (avatarWatch?.length > 32) ? setImagePreview(avatarWatch) : setImagePreview(defaultAvatar);
    }, [avatarWatch]);


    useEffect(() => {
        if (userAuthenticated &&
            userAuthenticated.name === nameWatch &&
            userAuthenticated.email === emailWatch &&
            userAuthenticated.slug === slugWatch &&
            userAuthenticated.avatar === avatarWatch
        ) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false)
        }
    }, [userAuthenticated, nameWatch, emailWatch, slugWatch, avatarWatch]);

    return {
        control,
        errors,
        handleSubmit,
        imagePreview,
        disabledButton,
        slugWatch,
        emailWatch
    }
};

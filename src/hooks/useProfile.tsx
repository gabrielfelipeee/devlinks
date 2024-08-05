import { useEffect, useState } from "react";
import defaultAvatar from '../assets/user.png';
import { ProfileFormData, profileFormSchema, useCustomForm } from "./useFormSchema";
import { useUsers } from "../context/UsersContext";

const useProfile = () => {
    const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const token = sessionStorage.getItem("token");
    const { userAuthenticated } = useUsers();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useCustomForm<ProfileFormData>(profileFormSchema);
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
            (
                userAuthenticated?.avatar != null &&
                userAuthenticated?.avatar.length > 0)
                ? userAuthenticated.avatar
                : defaultAvatar
        );
    }, [userAuthenticated, token]);

    // Muda a imagem enquanto o user digita a url
    useEffect(() => {
        (avatarWatch?.length > 5) ? setImagePreview(avatarWatch) : setImagePreview(defaultAvatar);
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
export default useProfile;

import { useEffect, useState } from "react";
import defaultAvatar from '../assets/user.png';
import { ProfileFormData, profileFormSchema, useCustomForm } from "./useFormSchema";
import useUserMutation from "./useUserMutation";

const useProfileForm = () => {
    const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);
    const { token, userAuthenticated } = useUserMutation();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useCustomForm<ProfileFormData>(profileFormSchema);

    const avatarWatch = watch('avatar');

    useEffect(() => {
        setValue('avatar', userAuthenticated?.avatar!);
        setValue('name', userAuthenticated?.name!);
        setValue('email', userAuthenticated?.email!);
        setImagePreview((userAuthenticated?.avatar != null && userAuthenticated?.avatar.length > 0) ? userAuthenticated.avatar : defaultAvatar);
    }, [userAuthenticated, token]);

    useEffect(() => {
        avatarWatch && setImagePreview(avatarWatch);
    }, [avatarWatch]);

    return {
        control,
        errors,
        handleSubmit,
        imagePreview
    }
};
export default useProfileForm;

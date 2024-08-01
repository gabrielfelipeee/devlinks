import { Controller } from 'react-hook-form';
import Button from '../../componenets/Button';
import InputField from '../../componenets/InputField';
import styles from './index.module.scss';
import useUserMutation from '../../hooks/useUserMutation';
import useProfileForm from '../../hooks/useProfileForm';
import Preview from '../../componenets/Preview';

const Profile = () => {
    const {
        updateProfile
    } = useUserMutation();
    const {
        control,
        errors,
        handleSubmit,
        imagePreview
    } = useProfileForm();

    return (
        <div className={styles.container_profile}>
            <div className={styles.box_profile}>
                <div className={styles.box_info}>
                    <h1 className={styles.h1}>Detalhes do perfil</h1>
                    <span className={styles.text}>Adicione detalhes ao seu perfil</span>
                </div>
                <form
                    onSubmit={handleSubmit((data) => updateProfile(data))}
                    className={styles.form}
                >
                    {imagePreview && (
                        <div className={styles.preview_img}>
                            <img className={styles.img} src={imagePreview} alt="Foto de perfil" />
                        </div>
                    )}
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                placeholder="Insira seu Link"
                                field={field}
                                error={!!errors?.avatar}
                                errorMessage={errors?.avatar?.message}
                            />
                        )}
                    />
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                placeholder="Insira seu Link"
                                field={field}
                                error={!!errors?.name}
                                errorMessage={errors?.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                placeholder="Insira seu Link"
                                field={field}
                                error={!!errors?.email}
                                errorMessage={errors?.email?.message}
                            />
                        )}
                    />
                    <Button>Salvar</Button>
                </form>
            </div>
            <div className={styles.preview}>
                <Preview />
            </div>
        </div>
    )
};
export default Profile;

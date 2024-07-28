import Button from '../../componenets/Button';
import InputField from '../../componenets/InputField';
import useProfile from '../../hooks/useUsersMutationsAndValidation';
import styles from './index.module.scss';

const Profile = () => {
    const {
        errors,
        handleSubmit,
        onSubmit,
        register,
        imagePreview
    } = useProfile();
    return (
        <div className={styles.container_profile}>
            <div className={styles.box_info}>
                <h1 className={styles.h1}>Detalhes do perfil</h1>
                <span className={styles.text}>Adicione detalhes ao seu perfil</span>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                {imagePreview && (
                    <div className={styles.preview}>
                        <img className={styles.img} src={imagePreview} alt="Foto de perfil" />
                    </div>
                )}
                <InputField
                    name="avatar"
                    register={register}
                    error={!!errors?.avatar?.message}
                    errorMessage={errors?.avatar?.message}
                    placeholder="insira a url da sua foto de perfil"
                />
                <InputField
                    name="name"
                    register={register}
                    error={!!errors?.name?.message}
                    errorMessage={errors?.name?.message}
                    placeholder="atualize seu nome"
                />
                <InputField
                    name="email"
                    register={register}
                    error={!!errors?.email?.message}
                    errorMessage={errors?.email?.message}
                    placeholder="atualize seu email"
                />
                <Button>Salvar</Button>
            </form>
        </div>
    )
};
export default Profile;

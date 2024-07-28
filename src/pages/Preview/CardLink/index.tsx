import styles from './styles.module.scss';
import { FaFacebook, FaGithub, FaInstagram, FaYoutube, FaArrowRightLong, FaLinkedin } from 'react-icons/fa6';

interface ICardProps {
    link: string,
    platform: string
};

const CardLink = (
    {
        link,
        platform
    }: ICardProps
) => {
    const platforms = [
        { icon: FaYoutube, name: "YouTube" },
        { icon: FaFacebook, name: "Facebook" },
        { icon: FaGithub, name: "GitHub" },
        { icon: FaInstagram, name: "Instagram" },
        { icon: FaLinkedin, name: "LinkedIn" }
    ];
    const SelectedIcon = platforms.find(item => item.name.toLocaleLowerCase() === platform.toLocaleLowerCase())?.icon;

    return (
        <a
            className={`${styles.container_card_link}  ${styles[platform.toLowerCase()]}`}
            target='_blank'
            href={link}
        >
            {SelectedIcon && <SelectedIcon className={styles.icon} />}
            {platform}
            <FaArrowRightLong className={styles.arrow} />
        </a>
    )
}
export default CardLink;

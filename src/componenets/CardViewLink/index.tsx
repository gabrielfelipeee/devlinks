import styles from './styles.module.scss';
import { FaArrowRightLong } from 'react-icons/fa6';
import platforms from '../../data/platforms';

interface ICardProps {
    link: string,
    platform: string
};

const CardViewLink = (
    {
        link,
        platform
    }: ICardProps
) => {


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
export default CardViewLink;

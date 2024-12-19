import styles from './styles.module.scss';

export const Loading = () => {
    return (
        <div className={styles.box_loading}>
            <span className={styles.loader}></span>
        </div>
    )
}

import styles from '@/styles/Home.module.css'
import { TimeUnit } from '@/constants';
import { percentageOfTimeUnit } from '@/utils';

export const ProgressBar = ({ unit }: { unit: TimeUnit }) => {
    const progress = percentageOfTimeUnit(unit);

    const textColor = progress > 60 ? "white" : "#858585";

    return (
    <div className={styles.progressBarContainer}>
        <span className={styles.progressBarFilled} style={{ width: `${progress}%` }} />
        <span className={styles.percentage} style={{ color: textColor }}>{`${progress}%`}</span>
    </div>
    );
};
import styles from '@/styles/Home.module.css'
import { TimeUnit, Text } from '@/constants';
import { percentageOfTimeUnit } from '@/utils';

const ProgressBar = ({ unit }: { unit: TimeUnit }) => {
    const progress = percentageOfTimeUnit(unit);

    return (
    <div className={styles.progressBarContainer}>
        <span className={styles.progressBarFilled} style={{ width: `${progress}%` }} />
        <span className={styles.percentage}>{`${progress}%`}</span>
    </div>
    );
};

const dayTitle = Text.Today;
const weekTitle = Text.ThisWeek;
const monthTitle = Text.ThisMonth;

export const ProgressWithTitle = ({ unit }: { unit: TimeUnit }) => {
  let title = dayTitle;

  if (unit === TimeUnit.Week) {
    title = weekTitle;
  } else if (unit === TimeUnit.Month) {
    title = monthTitle;
  }

  return (
    <div className={styles.progressWithTitleContainer}>
      <h2 className={styles.progressTitle}>{title}</h2>
      <ProgressBar unit={unit} />
    </div>
  )
};
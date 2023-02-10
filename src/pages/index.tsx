import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next';
import { ProgressBar } from '@/components/ProgressBar';
import { TimeUnit } from '@/constants';

const title = 'Daily Dash';
const description = 'Make today count';

const tabTitle = 'Make today ';
const tabTitleBold = 'count';

const dayTitle = 'Today';
const weekTitle = 'This week';
const monthTitle = 'This month';

const ProgressWithTitle = ({ unit }: { unit: TimeUnit }) => {
  let title = dayTitle;

  if (unit === TimeUnit.Week) {
    title = weekTitle;
  } else if (unit === TimeUnit.Month) {
    title = monthTitle;
  }

  return (
    <div className={styles.progressWithTitleContainer}>
      <div className={styles.progressTitle}>{title}</div>
      <ProgressBar unit={unit} />
    </div>
  )
};

const Home: NextPage = () => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <h1 className={styles.tabTitle}>
        {tabTitle}
        <span className={styles.tabTitleBold}>{tabTitleBold}</span>
      </h1>
    </header>
    <main className={styles.main}>
      <section>
        <ProgressWithTitle unit={TimeUnit.Day} />
        <ProgressWithTitle unit={TimeUnit.Week} />
        <ProgressWithTitle unit={TimeUnit.Month} />
      </section>
      <section>
        goals
      </section>
    </main>
  </>
);

export default Home;

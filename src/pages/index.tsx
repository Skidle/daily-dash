import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next';

const title = 'Daily Dash';
const description = 'Make today count';

const tabTitle = 'Make today ';
const tabTitleBold = 'count';

const dayTitle = 'Today';
const weekTitle = 'This week';
const monthTitle = 'This month';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#F9F9F9",
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#858585',
    textAlign: 'center'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

const ProgressWithTitle = ({ title, percent }: { title: string, percent: number }) => (
  <div>
    <div className={styles.progressTitle}>{title}</div>
    <ProgressBar completed={percent} />
  </div>
);

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
        <ProgressWithTitle title={dayTitle} percent={30} />
        <ProgressWithTitle title={weekTitle} percent={70} />
        <ProgressWithTitle title={monthTitle} percent={25} />
      </section>
      <section>
        goals
      </section>
    </main>
  </>
);

export default Home;

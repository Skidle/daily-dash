import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next';
import { ProgressWithTitle } from '@/components/ProgressBar';
import { TodoForm } from '@/components/TodoForm';
import { TimeUnit, Text } from '@/constants';

const Home: NextPage = () => (
  <>
    <Head>
      <title>{Text.DailyDash}</title>
      <meta name="description" content={`${Text.MakeToday} ${Text.Count}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <h1 className={styles.tabTitle}>
        {Text.MakeToday}
        <span className={styles.tabTitleBold}> {Text.Count}</span>
      </h1>
    </header>
    <main className={styles.main}>
      <section>
        <ProgressWithTitle unit={TimeUnit.Day} />
        <ProgressWithTitle unit={TimeUnit.Week} />
        <ProgressWithTitle unit={TimeUnit.Month} />
      </section>
      <section>
        <h2 className={styles.goalsTitle}>{Text.TodaysGoals}</h2>
        <TodoForm />
      </section>
    </main>
  </>
);

export default Home;

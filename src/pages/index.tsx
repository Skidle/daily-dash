import Head from 'next/head'
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { ProgressWithTitle } from '@/components/ProgressBar';
import { TaskSection } from '@/components/TaskSection';
import { AppDrawer } from '@/components/AppDrawer';
import { TimeUnit, TextKey } from '@/constants';
import { Project } from '@/types';
import { useLocalStorage } from '@/hooks';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localProjects, setLocalProjects] = useLocalStorage<Project[]>('projects', []);
  const [projects, setProjects] = useState<Project[]>([]);

  // load projects
  useEffect(() => {
      if (localProjects.length > 0) {
        setProjects(localProjects);
      }
    }, [localProjects]);
  
    useEffect(() => {
      setLocalProjects(projects);
    }, [projects, setLocalProjects])

  // CRUD handlers
  const handleAdd = ({ color, name }: Pick<Project, 'color' | 'name'>) => {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setProjects([...projects, newProject]);
  };

  const handleDelete = (projectId: Project['id']) => {
    setProjects(projects.filter(({ id }) => projectId !== id));
  };

  return (
    <>
      <Head>
        <title>{TextKey.DailyDash}</title>
        <meta name="description" content={`${TextKey.MakeToday} ${TextKey.Count}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box>
          <section>
            <ProgressWithTitle unit={TimeUnit.Day} />
            <ProgressWithTitle unit={TimeUnit.Week} />
            <ProgressWithTitle unit={TimeUnit.Month} />
          </section>
          <section>
            <Button onClick={onOpen} colorScheme='blue' variant='solid'>{TextKey.Projects}</Button>
            <AppDrawer isOpen={isOpen} onClose={onClose} handleAdd={handleAdd} handleDelete={handleDelete} projects={projects} />
          </section>
        </Box>
        <TaskSection projects={projects} />
      </main>
    </>
  )
};

export default Home;

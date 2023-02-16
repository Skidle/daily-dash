import Head from 'next/head'
import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { ProgressWithTitle } from '@/components/ProgressBar';
import { TaskSection } from '@/components/TaskSection';
import { AppDrawer } from '@/components/AppDrawer';
import { GoalSection } from '@/components/GoalSection';
import { TimeUnit, TextKey } from '@/constants';
import { Project } from '@/types';
import { RootState } from '@/store';
import { addProject, deleteProject, loadProjects } from '../features/projectsSlice';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projects = useSelector((state: RootState) => state.projects.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const localProjects = JSON.parse(window.localStorage.getItem('projects') || '[]');
    dispatch(loadProjects(localProjects));
  }, [dispatch]);

  // CRUD handlers
  const handleAdd = ({ color, name }: Pick<Project, 'color' | 'name'>) => {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    dispatch(addProject(newProject));
  };

  const handleDelete = (projectId: Project['id']) => {
    dispatch(deleteProject(projectId));
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
          <GoalSection projects={projects} />
        </Box>
        <TaskSection projects={projects} />
      </main>
    </>
  )
};

export default Home;

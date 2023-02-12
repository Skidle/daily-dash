import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    IconButton,
    Flex,
    Text,
    Heading,
    Badge
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';
import { AddProjectForm } from '@/components/AddProjectForm';
import { TextKey } from '@/constants';
import { Project } from '@/types';

interface ProjectsListProps {
    projects: Project[],
    handleDelete: (projectId: Project['id']) => void;
}

const ProjectsList = ({ projects, handleDelete }: ProjectsListProps) => (
    <Box mt="5">
        <Heading as='h3' size="md" mb="5">{TextKey.Projects}</Heading>
        {projects.length > 0
            ? projects.map(({ name, color, id }) => (
                <Flex justify='space-between' align='center' key={id}>
                    <Badge colorScheme={color}>{name}</Badge>
                    <IconButton variant="ghost" size="xs" aria-label='Delete project' icon={<CloseIcon />} onClick={() => handleDelete(id)} />
                </Flex>
            ))
            : <Flex justify="center"><Text as="i">No projects</Text></Flex>
        }
    </Box>
)

interface AppDrawerProps {
    isOpen: boolean,
    onClose: () => void,
    projects: Project[],
    handleAdd: ({ name, color }: Pick<Project, 'name' | 'color'>) => void;
    handleDelete: (projectId: Project['id']) => void;
}

export const AppDrawer = ({ isOpen, onClose, handleAdd, handleDelete, projects }: AppDrawerProps) => {
    return (
      <>
        <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{TextKey.AddProject}</DrawerHeader>
            <DrawerBody>
                <AddProjectForm handleAdd={handleAdd} />
                <ProjectsList projects={projects} handleDelete={handleDelete} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
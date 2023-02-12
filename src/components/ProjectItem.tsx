import { Checkbox , Box, IconButton, Flex, Editable, EditablePreview, EditableInput, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Text, Tag } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Task, Project } from '@/types';
import { TextKey } from '@/constants';

interface ProjectItemProps {
    projectName: Project['name'];
    tasks: Task[];
    color: Project['color'];
    handleComplete: (taskId: Task['id']) => void;
    handleDelete: (taskId: Task['id']) => void;
    handleEdit: (taskId: Task['id']) => (label: string) => void;
}

export const ProjectItem = ({ projectName, tasks, color, handleComplete, handleEdit, handleDelete }: ProjectItemProps) => {
    return (
        <AccordionItem>
            <h2>
                <AccordionButton py='3'>
                    <Flex justify='space-between' align='center' w='100%'>
                        <Tag variant='subtle' colorScheme={color}>
                            {projectName}
                        </Tag>
                        {/* <Box as="span" flex='1' textAlign='left'>{projectName}</Box> */}
                        <AccordionIcon />
                    </Flex>
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            {tasks.length > 0
                ? tasks.map(({ label, completed, id }) => (
                    <Box key={id}>
                        <Flex justify="space-between" align="center">
                            <Box>
                                <Flex>
                                    <Checkbox defaultChecked={completed} mr="3" colorScheme="gray" onChange={() => handleComplete(id)} />
                                    <Editable defaultValue={label} onSubmit={handleEdit(id)} selectAllOnFocus={false}>
                                        <EditablePreview px="3" py="1" as={completed ? 'del' : undefined} />
                                        <EditableInput px="3" py="1" />
                                    </Editable>
                                </Flex>
                            </Box>
                            <IconButton variant="ghost" size="xs" aria-label='Delete task' icon={<CloseIcon />} onClick={() => handleDelete(id)} />
                        </Flex>
                    </Box>
                ))
                : <Flex justify="center"><Text as="i">{TextKey.NoTasks}</Text></Flex>
            }
            </AccordionPanel>
        </AccordionItem>
    )
}

import React, { useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Input, Button, Flex, Box, IconButton, Editable, EditablePreview, EditableInput } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import styles from '@/styles/Home.module.css'
import { Text } from '@/constants';
import { useLocalStorage } from '@/hooks';

interface Todo {
    id: string;
    completed: boolean;
    task: string;
}

export const TodoForm = () => {
  const [localTodos, setLocalTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<null | number>(null);
  const [taskInput, setTaskInput] = useState('');
  const [taskIndex, setTaskIndex] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (localTodos.length > 0) {
      setTodos(localTodos);
    }
  }, [localTodos]);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos, setLocalTodos])


  const onSubmit = (data: FieldValues) => {
    console.log({ data });
    if (taskIndex !== null) {
      setTodos(
        todos.map((todo, i) => {
          if (i === taskIndex) {
            return { ...todo, task: taskInput };
          }
          return todo;
        })
      );
      setEditing(null);
      setTaskInput('');
      setTaskIndex(null);
    } else {
      setTodos([...todos, { task: data.task, completed: false, id: crypto.randomUUID() }]);
      reset();
    }
  };

  const toggleComplete = (index: number) => {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index: number) => {
    setEditing(index);
    setTaskInput(todos[index].task);
  };

  const saveEdit = (index: number) => {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, task: taskInput };
        }
        return todo;
      })
    );
    setEditing(null);
    setTaskInput('');
  };

  const handleEditableSubmit = (value, index) => {
    setTaskIndex(index);
    setTaskInput(value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
          <Input type="text" placeholder={Text.AddTask} {...register('task')} />
        </Box>
        {/* <Spacer /> */}
        <Button colorScheme='blue' type="submit">{Text.Add}</Button>
      </Flex>
      <ul>
        {todos.map(({ completed, task, id }, index) => (
          <li key={id}>
            {/* {editing === index ? (
              <input
                type="text"
                value={taskInput}
                onChange={e => setTaskInput(e.target.value)}
              />
            ) : (
              <span style={{
                textDecoration: completed ? 'line-through' : '',
                minWidth: '200px',
                padding: '10px',
                border: '1px solid #ccc',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                display: 'inline-block',
                background: 'white',
                marginTop: '5px',
              }}>
                {task}
              </span>
            )} */}
            <Editable
              defaultValue={task}
              onSubmit={(value) => handleEditableSubmit(value, index)}
              placeholder="Click to edit"
            >
              <EditablePreview />
              <EditableInput
                {...register(`task-${index}`)}
              />
            </Editable>
            {editing === null && (
              <>
                <IconButton aria-label={completed ? Text.Undo : Text.Complete} variant={completed ? 'solid' : 'ghost'} colorScheme='blue' icon={<CheckIcon />} onClick={() => toggleComplete(index)} />
                <IconButton aria-label={Text.Remove} colorScheme='red' variant='ghost' icon={<DeleteIcon />} onClick={() => removeTodo(index)} />
              </>
            )}
            {editing !== index && (
              <IconButton aria-label={Text.Edit} colorScheme='yellow' variant='ghost' icon={<EditIcon />} onClick={() => editTodo(index)} />
            )}
            {editing === index && (
              <Button colorScheme='blue' type="button" onClick={() => saveEdit(index)}>{Text.Save}</Button>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
}

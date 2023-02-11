import React, { useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
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
    if (editing !== null) {
      setTodos(
        todos.map((todo, i) => {
          if (i === editing) {
            return { ...todo, task: taskInput };
          }
          return todo;
        })
      );
      setEditing(null);
      setTaskInput('');
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <input type="text" placeholder={Text.AddTask} {...register('task')} />
      <button type="submit" className={styles.successButton}>{Text.Add}</button>
      <ul>
        {todos.map(({ completed, task, id }, index) => (
          <li key={id}>
            {editing === index ? (
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
            )}
            {editing === null && (
              <>
                <button type="button" className={styles.completeButton} onClick={() => toggleComplete(index)}>
                  {completed ? Text.Undo : Text.Complete}
                </button>
                <button type="button" className={styles.removeButton} onClick={() => removeTodo(index)}>
                  {Text.Remove}
                </button>
              </>
            )}
            {editing !== index && (
              <button type="button" className={styles.editButton} onClick={() => editTodo(index)}>
                {Text.Edit}
              </button>
            )}
            {editing === index && (
              <button type="button" className={styles.successButton} onClick={() => saveEdit(index)}>
                {Text.Save}
              </button>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
}

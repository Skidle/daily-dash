import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Text } from '@/constants';

interface Todo {
    id: string;
    completed: boolean;
    task: string;
}

export const TodoForm = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<null | number>(null);
  const [taskInput, setTaskInput] = useState('');
  const { register, handleSubmit, reset } = useForm();

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
      <button type="submit">Add</button>
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
              <span style={{ textDecoration: completed ? 'line-through' : '' }}>
                {task}
              </span>
            )}
            {editing === null && (
              <>
                <button type="button" onClick={() => toggleComplete(index)}>
                  {completed ? Text.Undo : Text.Complete}
                </button>
                <button type="button" onClick={() => removeTodo(index)}>
                  {Text.Remove}
                </button>
              </>
            )}
            {editing !== index && (
              <button type="button" onClick={() => editTodo(index)}>
                {Text.Edit}
              </button>
            )}
            {editing === index && (
              <button type="button" onClick={() => saveEdit(index)}>
                {Text.Save}
              </button>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
}

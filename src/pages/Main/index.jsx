import React, { useState } from 'react';

// Components
import { Todo } from '../../components';

// Elements
import { Button } from '../../elements';

// Bus
import {
  useTodosQuery, useCreateTodo, useUpdateTodo, useDeleteTodo,
} from '../../bus/todos';

// Styles
import { Header } from './styles';

export const Main = () => {
  const [text, setText] = useState('');
  const { data, isLoading: isTodosLoading } = useTodosQuery();
  const [createTodo, { isLoading: isCreateTodoLoading }] = useCreateTodo();
  const [updateTodo, { isLoading: isUpdateTodoLoading }] = useUpdateTodo();
  const [deleteTodo, { isLoading: isDeleteTodoLoading }] = useDeleteTodo();

  const isLoading = isTodosLoading
   || isCreateTodoLoading
    || isUpdateTodoLoading
     || isDeleteTodoLoading;

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  const onCreate = () => {
    if (text !== '') {
      createTodo({ text });
      setText('');
    }
  };

  return (
    <div>
      <Header>
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Button onClick={onCreate}>Create</Button>
      </Header>
      <main>
        {
          data.map((todo, index) => (
            <Todo
              key={todo.id}
              isColor={Boolean(index % 2)}
              {...todo}
              deleteHandler={() => deleteTodo(todo.id)}
              updateHandler={() => updateTodo({
                body: { isCompleted: !todo.isCompleted },
                todoId: todo.id,
              })}
            />
          ))
          }
      </main>
    </div>
  );
};

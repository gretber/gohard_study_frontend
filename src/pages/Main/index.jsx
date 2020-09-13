import React, { useState } from 'react';

// Components
import { Todo } from '../../components';

// Elements
import { Button } from '../../elements';

// React Query
import { useTodosMutations } from '../../bus/todos';

// Styles
import { Header } from './styles';

export const Main = () => {
  const [text, setText] = useState('');
  const {
    data, status, 
    addTodo, updateTodo, deleteTodo 
  } = useTodosMutations();

  const onCreate = () => {
    if (text !== '') {
      addTodo({ text });
      setText('');
    }
  };

  return (
    <section>
      <Header>
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Button onClick={onCreate}>Create</Button>
      </Header>
      <main>
        {
          status === 'loading' && (
            <div>Loading...</div>
          )
        }

        {
          status === 'error' && (
            <div>Error fetching data.</div>
          )
        }

        {
          status === 'success' && (
            data.map((todo, index) => (
              <Todo
                key={todo.id}
                isColor={Boolean(index % 2)}
                {...todo}
                deleteHandler={() => void deleteTodo(todo.id)}
                updateHandler={() => void updateTodo([{ isCompleted: !todo.isCompleted }, todo.id])}
              />
            ))
          )
        }
      </main>
    </section>
  );
};

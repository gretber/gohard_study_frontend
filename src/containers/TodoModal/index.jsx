// Core
import React, { useRef } from 'react';

// Components
import { Modal, Todo } from '../../components';

// Elements
import { AdaptiveScroll, Button } from '../../elements';

// Bus
import {
  useTodosQuery, useUpdateTodo, useDeleteTodo,
} from '../../bus/todos';

// Styles
import { Header, Footer } from './styles';

export const TodoModal = ({ closeHandler }) => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const { data } = useTodosQuery();
  const [updateTodo] = useUpdateTodo();
  const [deleteTodo] = useDeleteTodo();

  if (!data) {
    return null;
  }

  return (
    <Modal closeHandler={closeHandler}>
      <Header ref={headerRef}>
        <h2>Todos</h2>
      </Header>
      <AdaptiveScroll
        backgroundColor="gray"
        minHeight
        refs={[headerRef, footerRef]}
      >
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
      </AdaptiveScroll>
      <Footer ref={footerRef}>
        <Button onClick={() => void closeHandler()}>
          Close
        </Button>
      </Footer>
    </Modal>
  );
};

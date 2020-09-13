// Core
import React, { useRef } from 'react';

// Components
import { Modal, Todo } from '../../components';

// Elements
import { AdaptiveScroll, Button } from '../../elements';

// React Query
import { useTodosMutations } from '../../bus/todos';

// Styles
import { Header, Footer } from './styles';

export const TodoModal = ({ closeHandler }) => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const {
    data, status, 
    updateTodo, deleteTodo 
  } = useTodosMutations();

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
      </AdaptiveScroll>
      <Footer ref={footerRef}>
        <Button onClick={() => void closeHandler()}>
          Close
        </Button>
      </Footer>
    </Modal>
  );
};

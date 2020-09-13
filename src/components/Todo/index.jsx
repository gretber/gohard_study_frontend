import React from 'react';

// Elements
import { Button } from '../../elements';

// Styles
import { Container } from './styles';

export const Todo = ({
  isColor, text, isCompleted, updateHandler, deleteHandler,
}) => {
  return (
    <Container isColor={isColor}>
      <p>{text}</p>
      <Button onClick={() => void updateHandler()}>
        {isCompleted ? 'Done' : 'In progress'}
      </Button>
      <Button onClick={() => void deleteHandler()}>
        Delete
      </Button>
    </Container>
  );
};
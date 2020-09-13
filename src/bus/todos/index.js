// React Query
import { useQuery, useMutation, queryCache } from 'react-query';

// Api
import {
  getTodosAsync, createTodoAsync, updateTodoAsync, deleteTodoAsync,
} from './api';

export function useTodosMutations() {
  // Queries
  const { data, status } = useQuery('todos', getTodosAsync)

  // Mutations
  const [addTodo] = useMutation(createTodoAsync, {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries('todos')
    },
  });
  
  const [updateTodo] = useMutation(updateTodoAsync, {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries('todos')
    },
  });

  const [deleteTodo] = useMutation(deleteTodoAsync, {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries('todos')
    },
  });

  return {
    data, 
    status,
    addTodo,
    updateTodo,
    deleteTodo,
  }
}
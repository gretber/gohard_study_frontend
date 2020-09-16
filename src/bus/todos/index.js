// React Query
import { useQuery, useMutation, queryCache } from 'react-query';

// Api
import {
  getTodosAsync, createTodoAsync, updateTodoAsync, deleteTodoAsync,
} from './api';

// Queries
export const useTodosQuery = () => {
  return useQuery('todos', getTodosAsync)
}

// Mutations
export function useTodosMutations() {

  const [addTodo, { isLoading: isLoadingAddTodo }] = useMutation((body) => createTodoAsync(body), {

    onSuccess: (createdTodo) => {
       const previousTodos = queryCache.getQueryData('todos');
       queryCache.setQueryData('todos', [...previousTodos, createdTodo]);
    },
  });
  
  const [updateTodo, { isLoading: isLoadingUpdateTodo }] = useMutation(updateTodoAsync, {
    onSuccess: (updatedTodo) => {
      const previousTodos = queryCache.getQueryData('todos');
      queryCache.setQueryData('todos', () => previousTodos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }

        return todo;
      }));
    }
  });

  const [deleteTodo, { isLoading: isLoadingDeleteTodo }] = useMutation(deleteTodoAsync, {
    onSuccess: (isTodoDeleted, todoId) => {
      if (!isTodoDeleted) {
        throw new Error('Todo delete failed.');
      }
      const previousTodos = queryCache.getQueryData('todos');
      queryCache.setQueryData('todos', () => previousTodos.filter(
        (todo) => todo.id !== todoId),
      );
    },
  });

  const isLoading = isLoadingAddTodo || 
                    isLoadingUpdateTodo ||
                    isLoadingDeleteTodo

  return {
    addTodo,
    updateTodo,
    deleteTodo,
    isLoading,
  }
}
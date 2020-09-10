// Instruments
const todosUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const fetchTodos = async () => {
  const response = await fetch(todosUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Todos fetch failed');
  }

  return response.json();
};

export const createTodo = async (body) => {
  const response = await fetch(todosUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (response.status !== 201) {
    throw new Error('Todo create failed');
  }

  return response.json();
};

export const updateTodo = async ({ todoId, body }) => {
  const response = await fetch(`${todosUrl}/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    throw new Error('Todo update failed');
  }

  return response.json();
};

export const deleteTodo = async (todoId) => {
  const response = await fetch(`${todosUrl}/${todoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status !== 200) {
    throw new Error('Todo delete failed');
  }

  return response.json();
};

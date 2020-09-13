const todosUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const getTodosAsync = async () => {

  try {
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

  } catch (error) {
    console.log(error);
  } 
};

export const createTodoAsync = async (body) => {

  try {
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

  } catch (error) {
    console.log(error);
  } 
};

export const updateTodoAsync = async ([ body, todoId ]) => {

  try {
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

  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoAsync = async (todoId) => {

  try {
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

  } catch (error) {
    console.log(error);
  }
};
export const createTodo = (values) => {
  return {
    type: "ADD TODO",
    payload: { id: Math.round(Math.random() * 50), ...values },
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE TODO",
    payload: id,
  };
};
export const updateTodo = (formData) => {
  return {
    type: "UPDATE TODO",
    payload: formData,
  };
};

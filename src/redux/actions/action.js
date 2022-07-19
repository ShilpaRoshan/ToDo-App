export const createTodo = (values) => {
  return {
    type: "ADD TODO",
    payload: { id: Math.round(Math.random() * 50), ...values },
  };
};

const initalState = {
  todos: [
    {
      id: 1,
      title: "Do Coding Challenge",
      description: "Create todo app using react",
      createdAt: "18-07-2022",
      isDone: false,
    },
    {
      id: 2,
      title: "Learn driving",
      description: "Register in driving school and start taking classes.",
      createdAt: "18-07-2022",
      isDone: true,
    },
  ],
};
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD TODO":
      console.log(action.payload, "REDUCER");
      return {
        todos: [...state.todos, action.payload],
      };
    case "DELETE TODO":
      const todoID = action.payload;
      const newTodoList = state.todos.filter((todo) => todo.id !== todoID);
      return {
        todos: newTodoList,
      };
    case "UPDATE TODO":
      const payloadId = action.payload.id;
      console.log(payloadId, "UPDATE");
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === payloadId) {
            return action.payload;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};
export default reducer;

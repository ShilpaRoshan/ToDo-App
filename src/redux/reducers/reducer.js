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
    default:
      return state;
  }
};
export default reducer;

import React from "react";
import { useSelector } from "react-redux";

import SignOut from "./SignOut";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";

import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

function TodosPage() {
  const todos = useSelector((state) => state.todos);
  return (
    <>
      <h2>Todo-App</h2>
      <AddTodo />
      <Box>
        <Paper
          elevation={10}
          sx={{ padding: 10, height: "50vh", width: 1000, margin: "30px auto" }}
        >
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {todos.map((todo) => (
              <ListItem
                sx={{ bgcolor: "#e3e6b5", marginBottom: "4px" }}
                key={todo.title}
              >
                <ListItemText
                  primary={todo.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {todo.description}
                        {todo.createdAt}
                      </Typography>

                      <Chip
                        label={todo.isDone ? "Completed" : "Pending"}
                        size="small"
                        variant="outlined"
                        color={todo.isDone ? "success" : "error"}
                        sx={{ marginLeft: 5 }}
                      />
                    </React.Fragment>
                  }
                />
                <EditTodo todo={todo} />
                <DeleteTodo todo={todo} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <SignOut />
    </>
  );
}

export default TodosPage;

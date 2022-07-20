import React from "react";
import { deleteTodo } from "../redux/actions/todoAction";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

function DeleteTodo({ todo }) {
  const dispatch = useDispatch();
  function handleDelete(id) {
    dispatch(deleteTodo(id));
  }
  return (
    <>
      <IconButton
        aria-label="delete"
        sx={{
          backgroundColor: "red",
          width: 40,
          height: 40,
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "black",
            color: "red",
          },
        }}
        onClick={() => handleDelete(todo.id)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export default DeleteTodo;

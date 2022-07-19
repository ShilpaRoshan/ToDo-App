import React from "react";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function EditTodo() {
  return (
    <>
      <IconButton
        aria-label="edit"
        sx={{
          backgroundColor: "#989e2c",
          width: 40,
          height: 40,
          borderRadius: "50%",
          margin: 1,
          "&:hover": {
            backgroundColor: "black",
            color: "#989e2c",
          },
        }}
      >
        <EditIcon />
      </IconButton>
    </>
  );
}

export default EditTodo;

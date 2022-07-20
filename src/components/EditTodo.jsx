import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/actions/action";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function EditTodo({ todo }) {
  const dispatch = useDispatch();
  const [updateFormData, setUpdateFormData] = useState(null);
  const appState = useSelector((state) => state);
  const { todos } = appState;
  console.log(todos, "EDIT TODO APPSTATE");
  const [open, setOpen] = React.useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .max(50, "Cannot exceed than 50 characters"),
    description: Yup.string()
      .max(1024, "Cannot exceed than 1024 characters")
      .required("Required"),
    createdDate: Yup.date().required("Enter the Date"),
  });
  // useEffect((todo)=>{

  // },[])
  const handleClickOpen = (id) => {
    const newValue = todos?.find((state) => state.id === id);
    setUpdateFormData(newValue);
    setOpen(true);
  };

  console.log(updateFormData);
  //   useEffect(
  //     (updateFormData) => {
  //       if (todo) {
  //       }
  //     },
  //     [updateFormData]
  //   );

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  //   function handleEdit(todo) {
  //     console.log(todo, "update");
  //   }

  const onSubmit = (values, props) => {
    dispatch(updateTodo(updateFormData));
    console.log(values, "onSubmit");
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
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
        onClick={() => handleClickOpen(todo.id)}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Formik
            initialValues={{
              title: "",
              description: "",
              createdDate: "",
              isDone: false,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  id="name"
                  name="title"
                  label="Title"
                  fullWidth
                  variant="standard"
                  value={
                    updateFormData.title
                      ? updateFormData.title
                      : props.values.title
                  }
                  onChange={props.handleChange}
                  helperText={<ErrorMessage name="title" />}
                />
                <Field
                  as={TextareaAutosize}
                  aria-label="minimum height"
                  label="description"
                  name="description"
                  minRows={3}
                  placeholder="Minimum 1024 characters"
                  value={
                    updateFormData.description
                      ? updateFormData.description
                      : props.values.description
                  }
                  onChange={props.handleChange}
                  style={{ width: 200 }}
                  helperText={<ErrorMessage name="description" />}
                />
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  id="name"
                  name="createdDate"
                  type="date"
                  label="Created date"
                  fullWidth
                  variant="standard"
                  value={
                    updateFormData.createdDate
                      ? updateFormData.createdDate
                      : props.values.createdDate
                  }
                  onChange={props.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={<ErrorMessage name="createdDate" />}
                />
                {/* <Field
                  type={Checkbox}
                  name="isDone"
                  label="Completed"
                  //   checked={checked}
                  //   onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                /> */}
                {/* <Field
                  as={Checkbox}
                  name="isDone"
                  label="Pending"
                  //   checked={checked}
                  //   onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                /> */}

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose} type="submit">
                    Update
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditTodo;

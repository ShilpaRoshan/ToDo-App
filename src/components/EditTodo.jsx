import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/actions/todoAction";

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
  const [open, setOpen] = React.useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .max(50, "Cannot exceed than 50 characters"),
    description: Yup.string()
      .max(1024, "Cannot exceed than 1024 characters")
      .required("Required"),
    createdAt: Yup.date(),
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitHandler = (values, props) => {
    dispatch(updateTodo({ ...values, id: todo.id }));
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
              title: todo.title,
              description: todo.description,
              createdAt: todo.createdAt,
              isDone: false,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  id="name"
                  name="title"
                  label="Title"
                  fullWidth
                  variant="standard"
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
                  onChange={props.handleChange}
                  style={{ width: 200 }}
                  helperText={<ErrorMessage name="description" />}
                />
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  id="name"
                  name="createdAt"
                  type="date"
                  label="Created date"
                  fullWidth
                  variant="standard"
                  onChange={props.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={<ErrorMessage name="createdAt" />}
                />
                <label>
                  <Field type="checkbox" name="isDone" />
                  {`${props.values.isDone}`}
                </label>

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

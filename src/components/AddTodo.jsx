import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/actions/action";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function AddTodo() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .max(50, "Cannot exceed than 50 characters"),
    description: Yup.string()
      .max(1024, "Cannot exceed than 1024 characters")
      .required("Required"),
    createdDate: Yup.date().required("Enter the Date"),
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("FROM CREATE BUTTON");
    setOpen(false);
  };
  const onSubmit = (values, props) => {
    dispatch(createTodo(values));
    console.log(values, "onSubmit");
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Todo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Formik
            initialValues={{ title: "", description: "", createdDate: null }}
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
                  value={props.values.title}
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
                  value={props.values.description}
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
                  value={props.values.createdDate.toString()}
                  onChange={props.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={<ErrorMessage name="createdDate" />}
                />
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose} type="submit">
                    Create
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

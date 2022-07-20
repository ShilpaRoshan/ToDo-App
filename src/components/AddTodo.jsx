import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/actions/todoAction";
import moment from "moment";

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
    createdAt: Yup.date()
      .required("Required")
      .transform((value) => {
        return value ? moment(value).toDate() : value;
      })
      .required("Enter the Date"),
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (values, props) => {
    dispatch(createTodo(values));
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
            initialValues={{ title: "", description: "", createdAt: "" }}
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
                  margin="dense"
                  id="name"
                  name="createdAt"
                  type="date"
                  label="Created date"
                  fullWidth
                  variant="standard"
                  value={props.values.createdAt}
                  onChange={props.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={<ErrorMessage name="createdAt" />}
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

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function LoginPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user, "USEEFFECT");
        navigate("/todos");
      }
    });
  }, []);
  const initalValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (response) => {
        const user = response.user;
        await updateProfile(user, { displayName: values.username });
        navigate("/todos");
      })
      .catch((err) => alert(err.message));
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Box>
      <Paper
        elevation={10}
        sx={{ padding: 10, height: "50vh", width: 250, margin: "30px auto" }}
      >
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#989e2c" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Formik
          initialValues={initalValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="User name"
                name="username"
                variant="standard"
                placeholder="Enter user name"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.username}
                helperText={<ErrorMessage name="username" />}
              />
              {/* {console.log(props, "inside form")} */}
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="standard"
                placeholder="Enter email"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.email}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                variant="standard"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.password}
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  margin: "10px 0",
                  backgroundColor: "#989e2c",
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "900",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#989e2c",
                  },
                }}
                type="submit"
                disabled={props.isSubmitting}
              >
                Login In
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot Password?</Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;

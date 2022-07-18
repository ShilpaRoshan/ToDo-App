import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);
  function handleClick() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <Button
      variant="contained"
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
      onClick={handleClick}
    >
      LogOut
    </Button>
  );
}

export default SignOut;

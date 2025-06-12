import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import * as React from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

//css
const LoginContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  marginTop: '3%'
});

const LoginForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "300px",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
});

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await Axios.post("http://localhost:7002/api/auth/login", {
        userName, password
      })
      sessionStorage.setItem("Token", data);
      navigate("/product");
    }
    catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    };

    return (
      <LoginContainer>
        <Typography variant="h4" gutterBottom>
          כניסה
        </Typography>
        <LoginForm>
          <TextField
            label="שם משתמש" variant="outlined" margin="normal" required fullWidth onChange={(e) => setUserName(e.target.value)}/>
          <TextField
            label="סיסמא" type="password" variant="outlined" margin="normal" required fullWidth onChange={(e) => setPassword(e.target.value)}/>
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            variant="contained" color="primary" fullWidth onClick={fetchUser} disabled={userName === "" || password === ""} sx={{ mt: 2 }}>
           הכנס 
          </Button>
        </LoginForm>
      </LoginContainer>
    );
  };

  export default Login;



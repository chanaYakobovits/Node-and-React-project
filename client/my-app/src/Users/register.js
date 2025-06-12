import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

//css
const RegisterContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    marginTop: "1.5%"
});

const RegisterForm = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
});

const Register = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");


    const fetchUser = async () => {
        try {
            const { data } = await Axios.post("http://localhost:7002/api/auth/register", {
                userName, password, name, email, phone,
            });
            sessionStorage.setItem("Token", data);
            alert("נרשמת בהצלחה😊 ברוך הבא!")
            navigate("/product");
        }
        catch (error) {
            setError(JSON.parse(error.request.response).message)
            }
        };

        return (
            <RegisterContainer>
                <Typography variant="h4" gutterBottom>
                    הרשמה
                </Typography>
                <RegisterForm>
                    <TextField
                        label="שם משתמש" variant="outlined" margin="normal" required fullWidth onChange={(e) => setUserName(e.target.value)}/>
                    <TextField
                        label="סיסמא" type="password" variant="outlined" margin="normal" required fullWidth onChange={(e) => setPassword(e.target.value)}/>
                    <TextField
                        label="שם" variant="outlined" margin="normal" required fullWidth onChange={(e) => setName(e.target.value)}/>
                    <TextField
                        label="מייל" type="email"variant="outlined" margin="normal" required fullWidth onChange={(e) => setEmail(e.target.value)}/>
                    <TextField
                        label="טלפון" type="tel" variant="outlined" margin="normal" fullWidth onChange={(e) => setPhone(e.target.value)}/>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        variant="contained" color="primary" fullWidth onClick={fetchUser} disabled={userName === "" || password === "" || name === "" || email === "" } sx={{ mt: 2 }}>
                        הרשם
                    </Button>
                    <Button
                    component={Link} to="/login" fullWidth sx={{ mt: 2, textDecoration: "none" }}
                    >אתה חבר שלנו? הכנס
                    </Button>
                </RegisterForm>
               
            </RegisterContainer>
        );
    };

    export default Register

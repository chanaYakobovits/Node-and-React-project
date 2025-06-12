import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { Button, Box, TextField, Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";


//css
const Container = styled(Box)({
    maxWidth: "522px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "5%",
    marginBottom: "5%"
});

const FormTitle = styled(Typography)({
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold"
});

const StyledTextField = styled(TextField)({
    marginBottom: "20px",
    width: "100%",
});

const StyledButton = styled(Button)({
    margin: "10px",
    padding: "10px 20px",
    color: "white",
    backgroundColor: "#40E0D0",
    '&:hover': {
        backgroundColor: "#36c0b7"
    }
});

const UpdateProduct = () => {
    const location = useLocation();
    const prd = location.state ? location.state.prod : null;
    const [productName, setProductName] = useState(prd ? prd.productName : "");
    const [productCode, setProductCode] = useState(prd ? prd.productCode : "");
    const [price, setPrice] = useState(prd ? prd.price : "");
    const [amount, setAmount] = useState(prd ? prd.amount : "");
    const [productDescr, setProductDescr] = useState(prd ? prd.productDescr : "");
    const [recomend, setRecomend] = useState(prd ? prd.recomend : "");
    const [image, setImage] = useState(prd ? prd.image : "");
    const [error, setError] = useState("");
    const naviage = useNavigate();

    const Add = async () => {
        const token = sessionStorage.getItem("Token")
        if (!token)
        alert("אופס אינך מורשה להיכנס🤔 הירשם!")
        else{
            try {
                const {data} = await Axios.post("http://localhost:7002/api/product/", {
                productName, productCode, price, amount, productDescr, recomend, image
            }, { headers: { 'Authorization': `Bearer ${token}` } })
            alert(data.message)
            naviage("/mnj")
        }
        catch (error) {
            setError(JSON.parse(error.request.response).message)
        }
    }
    };

    const update = async () => {
        const token = sessionStorage.getItem("Token")
        if (!token)
        alert("אופס אינך מורשה להיכנס🤔 הירשם!")
        else{
            try {
                const {data} =await Axios.put("http://localhost:7002/api/product/", {
                productName, productCode, price, amount, productDescr, recomend, image
            }, { headers: { 'Authorization': `Bearer ${token}` } });
            console.log(data)
            alert(data.message);
            naviage("/mnj");
        } 
            catch (error) {
            setError(JSON.parse(error.request.response).message)
        }
    }
    }

    return (   
        <Container>
            <FormTitle>{prd ? "עידכון מוצר" : "הוספת מוצר"}</FormTitle>
            <StyledTextField
                value={productName} label="שם מוצר" variant="outlined" onChange={(e) => setProductName(e.target.value)} required/>
            <StyledTextField
                value={productCode} label="קוד מוצר" variant="outlined" onChange={(e) => setProductCode(e.target.value)} required/>
            <StyledTextField
                value={price} label="מחיר" variant="outlined" onChange={(e) => setPrice(e.target.value)} required/>
            <StyledTextField
                value={amount} label="כמות" variant="outlined" onChange={(e) => setAmount(e.target.value)}required />
            <StyledTextField
                value={productDescr} label="תאור המוצר" variant="outlined" onChange={(e) => setProductDescr(e.target.value)}/>
            <StyledTextField
                value={recomend} label="חוות דעת" variant="outlined" onChange={(e) => setRecomend(e.target.value)}/>
            <StyledTextField
                value={image} label="תמונה" variant="outlined" onChange={(e) => setImage(e.target.value)}/>
            <Box textAlign="center">
                {prd && (
                    <StyledButton onClick={update}>עדכן מוצר</StyledButton>
                )}
                {!prd && (
                    <StyledButton onClick={Add}>הוספת מוצר</StyledButton>
                )}
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Container>
    );
};

export default UpdateProduct

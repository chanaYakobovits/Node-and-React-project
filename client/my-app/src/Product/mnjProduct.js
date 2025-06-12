import { useEffect, useState } from "react";
import Axios from "axios";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Fab, Container, Grid, Card, CardMedia, CardContent, CardActions, IconButton, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from "@mui/system";

//css
const ProductListContainer = styled(Container)({
  marginTop: "20px",
});

const ProductCard = styled(Card)({
  maxWidth: 345,
  margin: "20px",
});

const Heading = styled('h1')({
  textAlign: 'right',
  margin: '20px',
  color: '#333',
  fontSize: '24px',
  marginTop: '4%',
  color: "#40E0D0",
  fontFamily: 'sans-serif' 
});

const MngProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    const token = sessionStorage.getItem("Token")
    if (!token)
      alert("אופס אינך מורשה להיכנס🤔 הירשם!")
    else {
      try {
        const { data } = await Axios.get("http://localhost:7002/api/product/");
        setProduct(data);
      }
      catch (error) {
        console.log(JSON.parse(error.request.response).message)
      }
    }
  };

  const deleteProduct = async (productCode) => {
    const token = sessionStorage.getItem("Token")
    if (!token)
      alert("אופס אינך מורשה להיכנס🤔 הירשם!")
    else {
      try {
        const { data } = await Axios.delete(`http://localhost:7002/api/product/${productCode}`,
          { headers: { 'Authorization': `Bearer ${token}` } })    
      alert("המוצר נמחק בהצלחה")
      // alert(data)
        fetchProduct()
      } catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (product.length === 0) return <h1>בטעינה</h1>;

  return (
    <>
      <Heading>
        אבנים עם מסר לרכישה אונליין במגוון עיצובים ובמחירים משתלמים
      </Heading>
      <ProductListContainer>
        <Grid container spacing={3}>
          {product.map((prod, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard>
                <CardMedia
                  component="img" alt={prod.productName} height="140" image={`/image/${prod.image}`} title={prod.productName} />
                {error && <Alert severity="error">{error}</Alert>}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {prod.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${prod.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <IconButton aria-label="delete" onClick={() => deleteProduct(prod.productCode)}>
                    <MdDelete />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => navigate('/updateproduct', { state: { prod } })}>
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ position: "fixed", bottom: 32, left: 32 }}>
          <Fab sx={{ backgroundColor: "#40E0D0", color: "white" }} aria-label="add" onClick={() => navigate('/updateproduct')}> 
            <AddIcon />
          </Fab>
        </Box>
      </ProductListContainer>
    </>
  )
}

export default MngProduct

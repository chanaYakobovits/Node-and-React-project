import { useEffect, useState } from "react";
import Axios from "axios";
import {  MdShoppingCart } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography,  Container, Grid, Card, CardMedia, CardContent, CardActions, IconButton } from "@mui/material";

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

const ProductList = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await Axios.get("http://localhost:7002/api/product/");
      setProduct(data);
    }
    catch (error) {
      console.log(JSON.parse(error.request.response).message)
    }

  };

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
                <CardContent>
                  im
                  <Typography gutterBottom variant="h5" component="div">
                    {prod.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${prod.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <IconButton aria-label="add to basket" onClick={() => navigate('/addbasket', { state: { prod } })}>
                    <MdShoppingCart />
                  </IconButton>
                </CardActions>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </ProductListContainer>
    </>
  );
};

export default ProductList

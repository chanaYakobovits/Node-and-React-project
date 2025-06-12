import { useEffect, useState } from "react";
import Axios from "axios";
import { MdDelete} from "react-icons/md";
import {useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Fab, Container, Grid, Card, CardMedia, CardContent, CardActions, IconButton, Alert } from "@mui/material";
import { styled } from "@mui/system";

//css
const BasketContainer = styled(Container)({
  marginTop: "23px",
});

const BasketCard = styled(Card)({
  maxWidth: 345,
  margin: "20px",

});

const BasketList = () => {
  const navigate = useNavigate();
  const [baskShop, setBaskShop] = useState([]);
  const [error, setError] = useState("");

  const getBaskShop = async () => {
    const token = sessionStorage.getItem("Token");
    if (!token)
      alert("אתה עדיין לא רשום ואנחנו לא נסתדר בלעדיך")
    else {
      try {
        const { data } = await Axios.get("http://localhost:7002/api/basketShop", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBaskShop(data);
      }
      catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    }
  }

  useEffect(() => {
    getBaskShop();
  }, []);

  const deleteFunc = async (id) => {
    const token = sessionStorage.getItem("Token");
    try {
      const { data } = await Axios.delete(`http://localhost:7002/api/basketShop/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("המוצר נמחק מהסל");

      getBaskShop();
    }
    catch (error) {
      setError(JSON.parse(error.request.response).message)
    }
  };

  if (baskShop.length === 0) return <h1>הסל שלך עצוב וריק😓</h1>;

  return (
    <>

      <BasketContainer>
        <Grid container spacing={3}>
          {baskShop.map((prod, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BasketCard>
                <CardMedia
                  component="img" alt={prod.productName} height="140" image={`/image/${prod.image}`} title={prod.productName} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {prod.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${prod.price} $`}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <IconButton aria-label="delete" onClick={() => deleteFunc(prod._id)}>
                    <MdDelete />
                  </IconButton>
                </CardActions>
              </BasketCard>
            </Grid>
          ))}
        </Grid>
        {error && <Alert severity="error">{error}</Alert>}
      </BasketContainer>
    </>
  );
}
export default BasketList;


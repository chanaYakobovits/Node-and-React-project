import { Outlet } from "react-router-dom";
import { MdShoppingCart, MdLocationOn, MdMail, MdPhone, MdCopyright } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";

const Footer = styled('footer')({
  backgroundColor: "#40E0D0",
  color: "white",
  padding: "46px 0",
  position: "relative",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

const FooterRight = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  marginRight: "20px",
});

const FooterLeft = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "20px",
});

const FooterTitle = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
  margin: "5px 0",
});

const Header = () => (
  <AppBar position="static" sx={{ backgroundColor: "#40E0D0" }}> 
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <IconButton color="inherit" component={NavLink} to="/basket">
          <MdShoppingCart />
        </IconButton>
        <IconButton color="inherit" component={NavLink} to="/register">
          <BsFillPersonPlusFill />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <NavLink to="/mnj" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6" sx={{ '&:hover': { borderBottom: '2px solid white' } }}>
            ניהול מוצרים
          </Typography>
        </NavLink>
        <NavLink to="/product" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6" sx={{ '&:hover': { borderBottom: '2px solid white' } }}>
            דף הבית
          </Typography>
        </NavLink>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: "20px" }}>
        <img width="110px" height="auto" src="./image/logo1.png" alt="Talking Stones Logo" />
      </Box>
    </Toolbar>
  </AppBar>
);

const Layout = () => {
  return (
    <div className="page">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer>
        <FooterRight>
          <FooterTitle>
            <MdPhone />
            0533179290
          </FooterTitle>
          <FooterTitle>
            <MdMail />
            AVANIM@GMAIL.COM
          </FooterTitle>
          <FooterTitle>
            <MdLocationOn />
            נמל עתיקות קיסריה
          </FooterTitle>
        </FooterRight>
        <FooterLeft>
          <FooterTitle>
            פיתוח ואיפיון אילה & חני
          </FooterTitle>
          <FooterTitle>
            עיצוב באדיבות GPT
          </FooterTitle>
          <FooterTitle>
            <MdCopyright />
            כל הזכויות שמורות
          </FooterTitle>
        </FooterLeft>
      </Footer>
    </div>
  );
};

export default Layout;


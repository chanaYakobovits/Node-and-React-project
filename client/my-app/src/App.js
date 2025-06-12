import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Layout from './common/Layout';
import Login from './Users/login';
import Register from './Users/register';
import Product from './Product/productList';
import Mnj  from './Product/mnjProduct';
import Updateproduct  from './Product/updateProduct';
import BasketList  from './Basket/basketList';
import Out from './Users/out';
import AddBasket from './Basket/addBasket';

function App() {
  return (
    <div className="App">
     <Router>
       <Routes>
         <Route path='/' element={<Layout/>}>
         <Route path='/product' element={<Product/>}/>
         <Route path='/mnj' element={<Mnj/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/updateproduct' element={<Updateproduct/>}/>
         <Route path='/basket' element={<BasketList/>}/>
         <Route path='/out' element={<Out/>}/>
         <Route path='/addbasket' element={<AddBasket/>}/>
       

        </Route>
       </Routes>
     </Router>
    </div>
  );
}

export default App;

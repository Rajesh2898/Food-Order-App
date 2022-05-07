import React,{useState} from 'react';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import CartContextProvider from './store/CartContextProvider';


function App() {
  const [isCartShown,setIsCartShown]=useState(false);

  const showCartHandler=()=>{
    setIsCartShown(true);
  }

  const hideCartHandler=()=>{
    setIsCartShown(false);
  }

  return (
    <CartContextProvider>
      {isCartShown && <Cart onHideCart={hideCartHandler} /> }    
      <Header onShowCart={showCartHandler}/>
      <Meals />
    </CartContextProvider>
  );
}

export default App;

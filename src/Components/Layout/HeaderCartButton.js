import React,{ useEffect,useState } from 'react';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [bumpClass,setBumpClass] = useState(false);
    const cartItemctx=useContext(CartContext)

    const { items } = cartItemctx;

    const numberOfCartItem = items.reduce( (currNumber,item) => {
        return currNumber+item.amount;
    },0);

    useEffect(()=>{
        if(items.length === 0){
            return
        }
        setBumpClass(true);
        
        const timer = setTimeout(()=>{
            setBumpClass(false);
        },300)

        return( ()=>{
            clearTimeout(timer);
        })
    },[items]);

    const btnClasses = `${classes.button} ${bumpClass ? classes.bump : ""}`;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
            </button>
    )
}

export default HeaderCartButton;
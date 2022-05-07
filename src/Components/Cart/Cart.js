import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
    const cartCtx=useContext(CartContext);

    const itemAddHandler = item => {
        cartCtx.addItems(item);
    };

    const itemRemoveHandler = id => {
        cartCtx.removeItems(id);
    };

    const totalAmount=cartCtx.totalAmount.toFixed(2);
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (<CartItem 
                                      key={item.id}
                                      name={item.name}
                                      amount={item.amount}
                                      price={item.price}
                                      onAdd={itemAddHandler.bind(null,item)}
                                      onRemove={itemRemoveHandler.bind(null,item.id)}/>))}
    </ul>

    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart
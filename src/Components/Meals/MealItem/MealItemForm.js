import { useRef,useState } from 'react';
import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const[amountIsValid,setAmountIsValid] = useState(true);

    const amountRef=useRef();
    

    const submitHandler = event =>{
        event.preventDefault();
        
        const amount = amountRef.current.value;
        const amountNumber=+amount;
        
        if(amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5){
            setAmountIsValid(false);
            return
        }

        props.addToCart(amountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountRef} label="Amount"  input={
                {  
                    id:"amount_"+props.id,
                    type:"number",
                    min:"1",
                    max:"5",
                    step:"1",
                    defaultValue:"1"
                }
            } />
            <button>+ Add</button>
            {!amountIsValid && <p>The amount should be greater than 1 and less than 5</p>}
        </form>
    );
}

export default MealItemForm;
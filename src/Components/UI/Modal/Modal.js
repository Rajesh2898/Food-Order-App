import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react'



const BackDrop = props => {
    return (<div className={classes.backdrop} onClick={props.onClose}></div>);
}


const Overlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const overlayPath = document.getElementById('overlays')

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />,overlayPath)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,overlayPath)}
        </Fragment>
    );
};


export default Modal;
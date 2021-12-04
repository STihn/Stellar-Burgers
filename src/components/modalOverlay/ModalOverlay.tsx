import React from "react";
import ReactDOM from "react-dom";
import cn from 'classnames';
import styles from './modalOverlay.module.css';


interface IProps {
    onClouse: any
}

const ModalOverlay: React.FC<IProps> = (props) => {
    const modalRoot = document.getElementById("react-modals")!;

    return ReactDOM.createPortal(
        <section className={cn(styles.body)} onClick={props.onClouse}>
            
        </section>,
        modalRoot
    )
}

export default ModalOverlay;
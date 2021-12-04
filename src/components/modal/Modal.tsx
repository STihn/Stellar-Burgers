import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import cn from 'classnames';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


interface IProps {
    children: React.ReactNode,
    onClouse: any,
    text?: string
}


const Modal = (props: IProps) => {
    const modalRoot = document.getElementById("react-modals")!;
    const {text} = props;

    return ReactDOM.createPortal(
        <section className={styles.body}>
            <div className={cn(styles.wrap, 'mt-10','ml-10', 'mr-10', `${!text ? styles.iconBtn : null}`)}>
                {props.text && <p className={cn(styles.text, "text text_type_main-large")}>{props.text}</p>}
                <CloseIcon type="primary" onClick={props.onClouse} />
            </div>
            {props.children}
        </section>,
        modalRoot
    )
}

export default Modal;
import React from "react";
import ReactDOM from "react-dom";
import cn from 'classnames';

import styles from './modal.module.css';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modalOverlay/ModalOverlay'
interface IProps {
    children: React.ReactNode,
    onClose: () => void,
    text?: string
}

const Modal = (props: IProps) => {
    const modalRoot = document.getElementById("react-modals")!;
    const {text, onClose, children} = props;

    React.useEffect(() => {
        const handleEsc = (event: { key: string }) => {
           if (event.key === 'Escape') {
            onClose()
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);

    return ReactDOM.createPortal(
        <div className={styles.modal}>
            <ModalOverlay onClick={onClose}/>
            <section className={styles.body}>
                <div className={styles.wrapper}>
                    <div className={cn(styles.wrap, 'mt-10','ml-10', 'mr-10', `${!text ? styles.iconBtn : null}`)}>
                        {text && <p className={cn(styles.text, "text text_type_main-large")}>{text}</p>}
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    {children}
                </div>
            </section>
        </div>,
        modalRoot
    )
}

export default Modal;
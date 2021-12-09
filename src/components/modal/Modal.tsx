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
    modalRoot.classList.add(styles.modal)
    const {text, onClose, children} = props;

    React.useEffect(() => {
        const handleEsc = (event: { keyCode: number; }) => {
           if (event.keyCode === 27) {
            onClose()
            modalRoot.classList.remove(styles.modal)
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);

    const handleClouse = () => {
        onClose()
        modalRoot.classList.remove(styles.modal)
    }

    return ReactDOM.createPortal(
        <React.Fragment>
                <ModalOverlay onClick={handleClouse}/>
                <section className={styles.body}>
                    <div className={styles.wrapper}>
                        <div className={cn(styles.wrap, 'mt-10','ml-10', 'mr-10', `${!text ? styles.iconBtn : null}`)}>
                            {text && <p className={cn(styles.text, "text text_type_main-large")}>{text}</p>}
                            <CloseIcon type="primary" onClick={handleClouse} />
                        </div>
                        {children}
                    </div>
                </section>
        </React.Fragment>,
        modalRoot
    )
}

export default Modal;
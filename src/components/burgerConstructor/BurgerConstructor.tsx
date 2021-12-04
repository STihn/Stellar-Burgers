import React from "react";
import cn from 'classnames';

import {ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerConstructor.module.css';
import Button from "../button/Button";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";

const BurgerConstructor = () => {
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClouse = () => {
        setOpen(false)
    }

    React.useEffect(() => {
        const handleEsc = (event: { keyCode: number; }) => {
           if (event.keyCode === 27) {
            setOpen(false)
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);
     
    return (
        <React.Fragment>
            <section className={styles.body}>
                <div className={cn(styles.wrapper,'mt-25', 'mb-10')}>
                    <div className={cn(styles.block,'ml-4', 'mr-4')}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                        />
                        <div className={styles.wrap}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            />
                        </div>
                        <div className={styles.wrap}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            />
                        </div>
                        <div className={styles.wrap}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            />
                        </div>
                        <div className={styles.wrap}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            />
                        </div>
                        <div className={styles.wrap}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            />
                        </div>
                        <div className={styles.wrap}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            />
                        </div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                        />
                    </div>
                </div>
                
                <div className={cn(styles.total, 'mr-4')}>
                    <span className={cn(styles.price, 'text text_type_digits-default')}>200</span>
                    <CurrencyIcon type="primary" />
                    <Button text={'оформить заказ'} className={cn(styles.button, 'ml-10', 'text text_type_main-default')} onClick={handleOpen}/>
                </div>
            </section>
            <div style={{overflow: 'hidden'}} id="react-modals">
                {isOpen && 
                    <React.Fragment>
                        <ModalOverlay onClouse={handleClouse} />
                        <Modal onClouse={handleClouse}>
                            <OrderDetails />
                        </Modal>
                    </React.Fragment>

                    }
            </div>
        </React.Fragment>
    )
}

export default BurgerConstructor;
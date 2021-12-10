import React from "react";
import cn from 'classnames';

import styles from './modalOverlay.module.css';

interface IProps {
    onClick?: () => void
}

const ModalOverlay: React.FC<IProps> = (props) => {

    return(
        <section className={cn(styles.body)} onClick={props.onClick}>
            
        </section>
    )
}

export default ModalOverlay;
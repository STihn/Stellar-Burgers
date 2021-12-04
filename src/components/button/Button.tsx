import React from "react";
import cn from 'classnames';
import styles from './button.module.css';

interface IProps {
    text?: string,
    className?: any,
    style?: Record<string, any>,
    icon?: React.ReactNode
    onClick?: any
}

const Button: React.FC<IProps> = (props) => {
    const {className, text, icon, onClick} = props;
    return (
        <div className={cn(className, styles.wrap)} onClick={onClick}>
            {icon}
            <p className={cn(styles.text, 'pl-2')}>{text}</p>
        </div>
    )
}

export default Button;
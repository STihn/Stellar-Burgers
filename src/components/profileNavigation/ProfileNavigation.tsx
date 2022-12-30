import React from "react";
import styles from './profileNavigation.module.css';
import cn from 'classnames';
import { NavLink, useHistory } from "react-router-dom";
import { DELETE_USER } from "../../services/actions/actionsUser";
import { deleteCookie } from "../../utils/utils";
import { useDispatch, useSelector } from "../../utils/types";
import { logOut } from "../../services/Api";

interface IProps {
    handleFeed: () => void,
    handleForm: () => void,
    logOutUser: () => void,
}

export const ProfileNavigation = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleForm = () => {
        history.push('/profile')
    }

    const handleFeed = () => {
        history.push('/profile/orders')

    }

    const logOutUser = () => {
        (logOut())
        .then((res: {success: boolean, message: string}) => {
            if(res.success){
                dispatch({type: DELETE_USER})
                deleteCookie('accessToken')
                history.push('/login')
            }
        }
    )}

    return (
        <React.Fragment>
            <NavLink
                className={cn(styles.link, 'text text_type_main-medium')}
                to={'/profile'}
                activeClassName='styles.active_link'
                onClick={() => handleForm()}
            >
                Профиль
            </NavLink>
            <NavLink
                className={cn(styles.link, 'text text_type_main-medium')}
                to={'/profile/orders'}
                activeClassName='styles.active_link'
                onClick={() => handleFeed()}
            >
                История заказов
            </NavLink>
            <NavLink
                className={cn(styles.link, 'text text_type_main-medium')}
                activeClassName='styles.active_link'
                to={'/login'}
                onClick={() => logOutUser()}
            >
                Выход
            </NavLink>
        </React.Fragment>
    )
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../utils/types";
import { Redirect, Route } from "react-router-dom";
import { getUserInfo } from "../../services/actions/actionsUser";
import { getCookie } from "../../utils/utils";


interface IProps {
    children: React.ReactNode,
    location?: Record<string, any> 
    path: string,
    exact: boolean
}

const ProtectedRouteAuth = (props: IProps) => {
    const dispatch = useDispatch();
    const {auth} = useSelector((store) => store.userReducuer);
    const {children, location, path, exact} = props;
    const token = getCookie('accessToken');


  
    useEffect(() => {
        if(token) {
            dispatch(getUserInfo())
        }
    }, []);

    return (
        <Route
            render={() =>
                auth !== null && auth.user ? (
                    <Redirect
                        to={{
                        pathname: location?.state?.from.pathname || '/',
                        state: { from: location }
                        }}
                    />
                ) : (
                children
                )
            }
            />
    )
}

export default ProtectedRouteAuth;
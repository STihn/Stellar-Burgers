import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getUserInfo } from "../../services/actions/actionsUser";
import { getCookie } from "../../utils/utils";

interface RootState {
    userReducuer: any
}

const ProtectedRouteAuth = (props: any) => {
    const dispatch = useDispatch();
    const {auth} = useSelector((store: RootState) => store.userReducuer);
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
                auth.user ? (
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
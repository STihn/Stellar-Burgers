import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getUserInfo } from "../../services/actions/actionsUser";
import { getCookie } from "../../utils/utils";
import { ILocation } from "../app/App";

interface IProps {
    path?: string,
    exact?: boolean,
    children?: React.ReactNode,
    location?: ILocation
}

interface RootState {
    userReducuer: any
}

const ProtectedRoute = (props: IProps) => {
    const dispatch = useDispatch();
    const {children, location, path, exact} = props;
    const {auth} = useSelector((store: RootState) => store.userReducuer)
    const token = getCookie('accessToken');



    useEffect(() => {
        if(token) {
            dispatch(getUserInfo());
        }
    }, [dispatch]);

    return (
        <Route 
            render={() =>
                auth.user ? (
                    children
                    ) : (
                    <Redirect
                        to={{
                        pathname: '/login',
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default ProtectedRoute;
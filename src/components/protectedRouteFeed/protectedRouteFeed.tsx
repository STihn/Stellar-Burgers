import React from "react";
import { Redirect, Route } from "react-router-dom";



export const ProtectedRouteFeed = () => {

    return (
        <Route 
            // render={() =>
            //     auth.user ? (
            //         children
            //         ) : (
            //         <Redirect
            //             to={{
            //             pathname: '/login',
            //             state: { from: location }
            //             }}
            //         />
            //     )
            // }
        />
    )
}
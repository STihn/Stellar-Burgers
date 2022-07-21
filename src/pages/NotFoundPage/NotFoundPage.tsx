import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {

    return (
        <React.Fragment>
            <p>Page 404</p>
            <Link to={'/'}>MainPage</Link>
        </React.Fragment>
    )
}

export default NotFoundPage;
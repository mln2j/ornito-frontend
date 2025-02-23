import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = ({isAuthenticated, logout}) => {
    return (
        <nav>
            <NavLink
                to="/"
            >
                Ornito
            </NavLink>

            {isAuthenticated && (
                <a href="/login" onClick={logout}>Odjava</a>
            )}
        </nav>
    );
};

export default Navbar;

import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = ({isAuthenticated, logout}) => {
    return (
        <nav>
            <div className="container navContainer">
                <NavLink
                    to="/"
                >
                    Ornito
                </NavLink>

                {isAuthenticated && (
                    <a href="/login" onClick={logout}>Odjava</a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

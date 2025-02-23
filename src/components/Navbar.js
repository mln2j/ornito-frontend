import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = ({isAuthenticated, logout}) => {
    return (
        <nav>
            <div className="container navContainer">
                <div className="navLinks">
                    <NavLink className="frontPageLink" to="/">
                        Ornito
                    </NavLink>
                    <NavLink
                        to="/profil"
                    >
                        Profil
                    </NavLink>
                </div>


                {isAuthenticated && (
                    <a href="/login" onClick={logout}>Odjava</a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

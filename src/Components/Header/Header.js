import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="main-header"> 
            <nav>
                <div className="main-nav-left">
                    <h1>
                        <Link className="main-nav-logo" to="home">LockDown Riders</Link>
                    </h1>
                </div>
                <div className="main-nav-right">
                    <ul className="nav-ul">
                        <li>
                            <Link className="nav-li" to="home">Home</Link>
                        </li>
                        <li>
                            <Link className="nav-li" to="search">Destination</Link>
                        </li>
                        <li>
                            <Link className="nav-li" to="">Blog</Link>
                        </li>
                        <li>
                            <Link className="nav-li" to="">Contract</Link>
                        </li>
                        <li>
                            <Link className="nav-li logIn-btn" to="search">LogIn</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
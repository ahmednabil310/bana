import React, { useState } from "react";
import { useSelector } from 'react-redux';
import history from '../../../../history';
//imported Cops
import LoginBar from './LoginBar';

const NavBar = () => {
    //redux store state
    const currentUser = useSelector(state => state.currentUser);
    //comp local state
    const [location, setLocation] = useState(history.location.pathname);

    const onMenuClick = (path) => {
        history.push(path);
        setLocation(path)
    }

    return (
        <nav className="uk-navbar-container uk-letter-spacing-small">
            <div className="uk-container">
                <div className="uk-position-z-index" data-uk-navbar>
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" href="index.html">Gallon-Recipes</a>
                        <div className="d-flex mt-1 ml-5">
                            <span className={`text-xs text-dark-grey pointer mr-4 ${location === '/' ? "text-orange" : ""}`} onClick={() => onMenuClick('/')}>Home</span>
                            <span className={`text-xs text-dark-grey pointer mr-4 ${location === '/recipes' ? "text-orange" : ""}`} onClick={() => onMenuClick('/recipes')}>Recipes</span>
                            <span className={`text-xs text-dark-grey pointer mr-4 ${location === '/search' ? "text-orange" : ""}`} onClick={() => onMenuClick('/search')}>Search</span>
                            <span className={`text-xs text-dark-grey pointer mr-4 ${location === '/contact' ? "text-orange" : ""}`} onClick={() => onMenuClick('/contact')}>Contact</span>
                            <span className={`text-xs text-dark-grey pointer mr-4 ${location === '/submit' ? "text-orange" : ""}`} onClick={() => onMenuClick('/submit')}>Submit Recipe</span>
                            {currentUser.userRole === 'admin' && <span className={`text-xs text-dark-grey pointer mr-4 ${location === '/submit' ? "text-orange" : ""}`} onClick={() => onMenuClick('/dashboard')}>Admin Panel</span>}
                        </div>
                        {/* <ul className="uk-navbar-nav uk-visible@m uk-margin-large-left">
                            <li className={path === '/' ? "uk-active" : ""}><a className="font-montserrat" href="/">Home</a></li>
                            <li className={path === '/recipes' ? "uk-active" : ""}><a className="font-montserrat" href="/recipes">Recipes</a></li>
                            <li className={path === '/search' ? "uk-active" : ""}><a className="font-montserrat" href="/search">Search</a></li>
                            <li className={path === '/contact' ? "uk-active" : ""}><a className="font-montserrat" href="/contact">Contact</a></li>
                            <li className={path === '/submit' ? "uk-active" : ""}><a className="font-montserrat" href="/submit">Submit Recipe</a></li>
                        </ul> */}
                    </div>
                    <LoginBar />
                </div>
            </div>
        </nav>
    )
}

export default NavBar


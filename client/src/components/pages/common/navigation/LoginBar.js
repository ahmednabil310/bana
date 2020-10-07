import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { logoutUser } from '../../../../actions/userActions';
import history from '../../../../history';


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

const LoginBar = () => {
    //redux store state
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();


    const UserData = () => {
        return (
            <div className="uk-navbar-right">
                <ul className="uk-navbar-nav uk-visible@m">
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <div className="d-flex align-items-center">
                                    <img className="user-image" src={currentUser.image || require('../../../../images/default-profile-picture.png')} alt='profile' />
                                    <i className="material-icons ml-2">keyboard_arrow_down</i>
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {/* <Dropdown.Item eventKey="1" className="mb-2">{`${firstName} ${lastName}`}</Dropdown.Item> */}
                                <Dropdown.Item eventKey="1" onClick={() => history.push('/profile')}>My Profile</Dropdown.Item>
                                <Dropdown.Item eventKey="1" onClick={() => dispatch(logoutUser())}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        )
    }

    const LogIn = () => {
        return (
            <div className="uk-navbar-right">
                <div>
                    <a className="uk-navbar-toggle" data-uk-search-icon href="/"></a>
                    <div className="uk-drop uk-background-default" data-uk-drop="mode: click; pos: left-center; offset: 0">
                        <form className="uk-search uk-search-navbar uk-width-1-1">
                            <input className="uk-search-input uk-text-demi-bold" type="search" placeholder="Search..." autoFocus />
                        </form>
                    </div>
                </div>
                <span className="pointer" onClick={() => history.push('/signin')}>Sign In</span>
                <div className="uk-button uk-button-primary ml-3" onClick={() => history.push('/signup')}>Sign Up</div>
                <a className="uk-navbar-toggle uk-hidden@m" href="#offcanvas" data-uk-toggle><span
                    data-uk-navbar-toggle-icon></span></a>
            </div>
        )
    }

    return currentUser._id ? <UserData /> : <LogIn />
}

export default LoginBar

// Richie T-57866

// Import the necessary modules from react.
import React from "react";
import { Link } from "react-router-dom";
import './Buttons.css';
import { Dropdown } from 'react-bootstrap';

/* Functional component that maps through an array and creates a button that when clicked on will link the user to url of the localhost/(value of the index). */
const NavbarButtons = (props) => {
    /* Declares an array of categories based on value of 'props.userStatus'. Can add more options in future versions. */
    const categories = props.userStatus === 'user' ? ['search'] :  (props.userStatus === 'admin' ? ['users','resources', 'search'] : ['resources', 'search']);
    /* Function that logs user out of app and clears the localStorage. */
    const userLogout = () => {
        let bodyElement = document.getElementById("body");
        bodyElement.classList.remove("bodyScrollAdjustment");
        localStorage.clear();
        window.location = '/';
    }
    /* Function that unclicks all 'keywords' and 'restrictions'. It also empties the 'props' and 'localStorage' arrays. *** Note *** This function is currently disabled. To enable, uncomment lines 45 and 67. Also, set lines 41 and 63 to 'to={``}'. */
    const clearFilters = (e, item) => {
        e.preventDefault();
        if(props.propBool) {
            props.setPropBool(false);
        }
        props.setKeywords([]);
        props.setRestrictions([]);
        window.localStorage.setItem('keywords', []);
        window.localStorage.setItem('restrictions', []);
        window.location.href = '/' + item;
    }
    return (
        <div id='navbarButtonDiv'>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="barsIcon">
                <i className="fa-solid fa-bars fa-2x"></i>
                </Dropdown.Toggle>
                <div id='mainNav'>
                    {categories.map((item, idx) => (
                        <Link
                            to={`/${item}`}
                            key={'nav' + idx}
                            id={item}
                            className='reactButton navLink'
                            // onClick={(event) => clearFilters(event, item)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to='#'
                        key='logout'
                        id='logoutDrop'
                        className='reactButton navLink'
                        onClick={()=>userLogout()}
                    >
                        logout
                    </Link>
                </div>
                <Dropdown.Menu>
                    {categories.map((item, idx) => (
                        <Link
                            to={`/${item}`}
                            key={'nav' + idx}
                            id={item}
                            className='reactButton navLink dropDownLink'
                            // onClick={(event) => clearFilters(event, item)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to='#'
                        key='logout'
                        id='logoutDrop'
                        className='reactButton navLink dropDownLink'
                        onClick={()=>userLogout()}
                    >
                        logout
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default NavbarButtons;
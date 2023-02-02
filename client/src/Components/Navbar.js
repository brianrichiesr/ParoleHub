// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import { Link } from "react-router-dom";
import NavbarButtons from './Buttons/NavbarButtons';

const Navbar = (props) => {
    /* Function that unclicks all 'keywords' and 'restrictions'. It also empties the 'props' and 'localStorage' arrays. */
    const goHome = (e) => {
        e.preventDefault();
        if(props.propBool) {
            props.setPropBool(false);
        }
        props.setKeywords([]);
        props.setRestrictions([]);
        window.localStorage.setItem('keywords', []);
        window.localStorage.setItem('restrictions', []);
        window.location.href = '/';
    }
    /* If there is a token, show the user the real navbar. Else, show the user a dummy navbar. */
    return (
        <div id='navbarDiv'>
            <div id='navbar'>
                {props.token ?
                    <nav
                    className={"navbar-default"}
                    role="navigation"
                >
                    <article className="container-fluid" >
                        <header className="navbar-header">
                            <Link 
                                to = {''}
                                id = {"Home"}
                                key = {'home1'}
                                onClick={(event) => {goHome(event)}}
                            >
                                <div id="brandName">
                                    ParoleHub
                                </div>
                            </Link>
                            <section className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                </ul>
                            </section>
                        </header>
                    </article>
                    <NavbarButtons
                        userStatus={props.userStatus}
                        filters={props.filters} setFilters={props.setFilters}
                        keywords={props.keywords}
                        setKeywords={props.setKeywords}
                        restrictions={props.restrictions}
                        setRestrictions={props.setRestrictions}
                        propBool={props.propBool}
                        setPropBool={props.setPropBool}
                    />
                </nav> :
                <nav
                    className={"navbar-default dummyNavbar"}
                    role="navigation"
                >
                    <article className="container-fluid" >
                        <header className="navbar-header">
                            <Link 
                                to = {''}
                                id = {"Home"}
                                key = {'home1'}
                                onClick={(event) => {goHome(event)}}
                            >
                                <div id="brandName">
                                    ParoleHub
                                </div>
                            </Link>
                        </header>
                    </article>
                </nav>}
            </div>
            <hr id="headerHr"></hr>
        </div>
    )
}

export default Navbar;
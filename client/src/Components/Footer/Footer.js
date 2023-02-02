// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer
            id='communityBanner'
        >
            <div id='hb1'>
                <p>
                    Community First
                                </p>
                <div id='contactDiv'>
                    <ul className='column contactDivOne'>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                    </ul>
                    <ul className='column contactDivTwo'>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                    </ul>
                    <ul className='column contactDivThree'>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                        <li>
                            <p>
                                Dummy Corporation
                                            </p>
                            <p>
                                phonyemail@gmail.com
                                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Will only show on larger devices, otherwise 'display: none' needed different 'fa-' sizes. */}
            <div id='iconDiv' className='largerDevices'>
                <a id='facebook' href="#"><i className="fab fa-facebook-square fa-3x"></i></a>
                <a id='google' href="#"><i className="fab fa-google fa-3x"></i></a>
                <a id='twitter' href="#"><i className="fab fa-twitter fa-2x"></i></a>
                <a id='instagram' href="#"><i className="fab fa-instagram fa-3x"></i></a>
                <a id='youtube' href="#"><i className="fab fa-youtube fa-3x"></i></a>
                <a id='linkedin' href="#"><i className="fab fa-linkedin fa-3x"></i></a>
            </div>
            {/* Will only show on smaller devices, otherwise 'display: none' needed different 'fa-' sizes. */}
            <div id='iconDiv' className='smallerDevices'>
                <a id='facebook' href="#"><i className="fab fa-facebook-square fa-2x"></i></a>
                <a id='google' href="#"><i className="fab fa-google fa-2x"></i></a>
                <a id='twitter' href="#"><i className="fab fa-twitter"></i></a>
                <a id='instagram' href="#"><i className="fab fa-instagram fa-2x"></i></a>
                <a id='youtube' href="#"><i className="fab fa-youtube fa-2x"></i></a>
                <a id='linkedin' href="#"><i className="fab fa-linkedin fa-2x"></i></a>
            </div>
        </footer>
    );
};

export default Footer;
// Richie T-57866

// Import the necessary modules from react.
import React, { useState } from 'react';
import BackToTopButtons from '../../Components/Buttons/BackToTopButtons';
import Login from './Login';
import Signup from './Signup';
import Footer from '../Footer/Footer'
import './Login.css';

/* Functional component that creates the landing page of the app. */
const LandingPage = (props) => {
    /* Declares the state of a component as 'false' and a function to change the state of that component.*/
    const [loginState, setLoginState] = useState(false);
    return (
        <div>
        {/* If the value of 'loginState' is 'true', then display the landing page of the app. If the state is 'signup', show the signup page. If the state is 'login', show the login page. */}
            {!loginState ? 
                <div
                    id='appMainContentDiv'
                    className='landingDiv homeDiv'
                >
                    <div
                        id='resultsTop'
                        className='homeTop'
                    ></div>
                    <div
                        id='appHeader'
                        className='landingHeader'
                    >
                        <h1
                            id='appH1'
                            className='loginH1 landingPageH1Adjust'
                        >
                            <span id='bannerSpan'>user signup/login</span>
                            <span className='loginSpan adjustSpan'>
                                <button
                                    className='reactButton'
                                    id='signup'
                                    onClick={() => setLoginState('signup')}
                                >
                                    sign up
                                </button>
                                <button
                                    className='reactButton'
                                    id='login'
                                    onClick={() => setLoginState('login')}
                                >
                                    login
                                </button>
                            </span>
                        </h1>
                        <div id='midHeaderDiv'>
                            <h2 id='appH2' className='welcomeH2'>Welcome to the ParoleHub!</h2>
                            <p id='mainP'>Rehabilitation Resources for California</p>
                        </div>
                        <p className='motto center'>
                            This app is designed to help incarcerated people, or their loved ones, get all of the resources in California needed for the parole process. Please login, or sign up if you are new to the app. Thank you for choosing ParoleHub.
                        </p>
                    </div>
                    <div className='testimonials'>
                        <div className='box upper'>
                            <div className='testimonialImage imgOne left'></div>
                            <div className='testimonialInfo testOne'>
                                <div className='divOne'>
                                    <p className='testP testimonialName'>Aaron Johnson</p>
                                    <p className='testP testimonialStatus'>6 months returned</p>
                                </div>
                                <div className='testimonialQuote divTwo'>ParoleHub gave me the much needed reentry help that no one else could provide. It covered all of the bases. I highly recommend ParoleHub to anyone trying to get their life together. Thank you.</div>
                            </div>
                        </div>
                        <div className='box lower'>
                            <div className='testimonialInfo testTwo'>
                                <div className='divOne'>
                                    <p className='testP testimonialName'>Deanna Myers</p>
                                    <p className='testP testimonialStatus'>2 years returned</p>
                                </div>
                                <div className='testimonialQuote divTwo'>This app gave me the chance to properly plan for my reentry. I made plenty of contacts with the right organizations and when I got released, I hit the ground running. One love!</div>
                            </div>
                            <div className='testimonialImage imgTwo right'></div>
                        </div>
                    </div>
                    <div id='midPageDiv'></div>
                    <div className='testimonials testimonialTwo'>
                        <div className='box upper'>
                            <div className='testimonialImage imgThree left'></div>
                            <div className='testimonialInfo testOne'>
                                <div className='divOne'>
                                    <p className='testP testimonialName'>Chris Fields</p>
                                    <p className='testP testimonialStatus'>5 years returned</p>
                                </div>
                                <div className='testimonialQuote divTwo'>I was already free when this app came out, but I still needed help. I was having a hard time finding all the resources I needed in one location. ParoleHub was the answer. And it so easy to use. Great job on this!</div>
                            </div>
                        </div>
                        <div className='box lower'>
                            <div className='testimonialInfo testTwo'>
                                <div className='divOne'>
                                    <p className='testP testimonialName'>Diego Flores</p>
                                    <p className='testP testimonialStatus'>Just found suitable</p>
                                </div>
                                <div className='testimonialQuote divTwo'>I tried to get information from other places. Most of it was inaccurate. ParoleHub's info was up-to-date. I submitted a rigtheous packet that impressed the Board. Without ParoleHub, I would not have gotten a date.</div>
                            </div>
                            <div className='testimonialImage imgFour right'></div>
                        </div>
                    </div>
                    <div id='landingInfo'>
                        <div id='designerBox'>
                            <div id='designerImg'></div>
                            <p id='designerQuote'>"We are more than our worst decisions."</p>
                            <p id='designerName'>Brian Richie Sr., Creator of ParoleHub and Advocate for the Incarcerated.</p>
                        </div>
                        <Footer />
                        <BackToTopButtons />
                    </div>
                </div> :
                    (loginState === 'signup' ? <Signup setLoginState={setLoginState} setError={props.setError} setToken={props.setToken} /> : <Login setLoginState={setLoginState} setError={props.setError} setToken={props.setToken} />)}
        </div>
    );
};

export default LandingPage;
// Richie T-57866

// Import the necessary modules from react.
import React, { useState } from 'react';
import {handleSignup} from '../../api/index';
import './Login.css';

/* Functional component that returns a form that the user can use to sign up for the app. */
const Signup = (props) => {
    /* Declares the state of a component as an empty string and sets the error passed down with the props as an empty string.*/
    const [error, setError] = useState('');
    props.setError('');
    // Function that takes one argument (the event) and will be called when the form is submitted.
    const signUpUser = async (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Grabs the form.
        const userSignup = document.getElementById('userSignup');
        // Assigns the values of the form to keys in a newly created object.
        const newUser = {
            username: userSignup.username.value.trim(),
            email: userSignup.email.value.trim(),
            password: userSignup.password.value.trim(),
            status: 'user',
            userToken: '',
        };

       await handleSignup(newUser)
        .then(res=> {
            const { token } = res.data;
            // Assigns localStorage variable with variable of 'token'.
            window.localStorage.setItem('api_token', token);
            // Refreshes the page without resetting state.
            window.location = '/';
        })
        .catch(err=>{
            console.log('err', err)
            setError('Email already registered.');
        });
    };
    return (
        <div
            id='loginDiv'
        >
            <div
                id='appHeader'
                className='signupHeader'
            >
                <h1
                    id='appH1'
                    className='loginH1 loginAdjust'
                >
                    <span id='bannerSpan'>user signup</span>
                    <span className='loginSpan adjustSpan'>
                        <button
                            className='reactButton'
                            id='startOver'
                            onClick={() => props.setLoginState(false)}
                        >
                            start over?
                        </button>
                    </span>
                </h1>
            </div>
            <section id="pageBody">
                <h2 id='errorH2'>
                    {error && error}
                </h2>
                <form
                    id='userSignup'
                    name='userSignup'
                    onSubmit={(event) => signUpUser(event)}
                >
                    <input id='username' name='username' placeholder='username' required />
                    <input id='email' name='email' placeholder='email' type='email' />
                    <input id='password' name='password' placeholder='password' type='current-password' />
                    <button id="signupButton" className="postButton" type="submit">signup</button>
                </form>
            </section>
        </div>
    );
};

export default Signup;
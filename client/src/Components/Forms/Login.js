// Richie T-57866

// Import the necessary modules from react.
import React, { useState } from 'react';
import {handleLogin} from '../../api/index';
import './Login.css';

/* Functional component that returns a form that allows the user to login to the database. */
const Login = (props) => {
    /* Declares the state of a component as an empty string and sets the error passed down with the props as an empty string.*/
    const [error, setError] = useState('');
    props.setError('');
    // Function that takes one argument (the event) and will be called when the form is submitted.
    const loginUser = async (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Grabs the form.
        const userLogin = document.getElementById('userLogin');
        // Assigns the values of the form to keys in a newly created object.
        const user = {
            username: userLogin.username.value.trim(),
            email: userLogin.email.value.trim(),
            password: userLogin.password.value.trim()
        };

        await handleLogin(user)
            .then(res => {
                // Declares a const with the value of 'res.data'.
                const { token } = res.data;
                // Assigns localStorage variable with variable of 'token'.
                window.localStorage.setItem('api_token', token);
                // Refreshes the page without resetting state.
                window.location = '/';
            })
            .catch(err=>{
                console.log('err', err);
                setError("Invalid Credentials, Try Again!")
            });
    };
    return (
        <div
            id='loginDiv'
        >
            <div
                id='appHeader'
                className='loginHeader'
            >
                <h1 
                    id='appH1'
                    className='loginH1 loginAdjust'
                >
                    <span id='bannerSpan'>user login</span>
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
                    id='userLogin'
                    name='userLogin'
                    onSubmit={(event) => loginUser(event)}
                >
                    <input id='username' name='username' placeholder='username' required />
                    <input id='email' name='email' placeholder='email' required
                    type='email' />
                    <input id='password' name='password' placeholder='password' required
                    type='password' />
                    <button id="loginButton" className="postButton" type="submit">login</button>
                </form>
            </section>
        </div>
    );
};

export default Login;
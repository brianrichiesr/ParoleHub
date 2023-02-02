// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import StatusButtons from '../Buttons/StatusButtons';
import { Link } from "react-router-dom";

/* Functional component that returns a form that the user can use to submit a new user to the database. */
const UserForm = () => {
   /* Declares the state of a component as 'false' and the state of another component to an empty string.*/
    const [enterUser, setEnterUser] = useState(false);
    const [error, setError] = useState('');
    /* useEffect hook. When component mounts, closes 'filters' and adjusts for scrollbar. */
    useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
        let mainAppDiv = document.getElementById('mainAppDiv');
        if (mainAppDiv) {
            mainAppDiv.classList.remove('marginRightAdjustment');
        }
        let pageDivScrollAdustment = document.getElementById('pageDiv');
        pageDivScrollAdustment.classList.remove('mainBodyMarginTopAdjustment');
        pageDivScrollAdustment.classList.add('marginZero');
    }, []);
    // Function that takes one argument (the event) and will be called when the form is submitted.
    const createUser = (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Declares a variable whose value is the form being used to enter a resource.
        const createNewUser = document.forms.createNewUser;
        /* Declares a variable whose properties are a match to the schema of a resource document in the mongo database. */
        let userInfo = {
            'username': '',
            'email': '',
            'password': '',
            'status': '',
        };
        /* Function that grabs all the elements with 'reactButton' in it's className, and pushes each elements value into the appropriate array that is a value in the 'userInfo' object. */
        const getValues = () => {
            // Declares the elements into an array.
            const buttonArray = document.getElementsByClassName('reactButton');
            /* Declares a variable equal the length of 'buttonArray'. By default, react seems to add 'length', 'item', and 'namedItem' to 'buttonArray' when I iterate with a for in loop. So I set the 'limit' as a work around until I can research why react does that. */
            const limit = buttonArray.length;
            // For in loop to iterate 'buttonArray'.
            for (let item in buttonArray) {
                // If 'item' is less than 'limit'.
                if (item < limit) {
                    // Make an array from the className of the element in 'buttonArray' at the index of 'item'.
                    let key = buttonArray[item].className.split(' ');
                    /* If the third index of 'key' exists and it equals 'clicked', push the value of the button into the appropriate array in 'resourceInfo'. */
                    key[2] && key[2] === 'clicked' ? userInfo['status'] = buttonArray[item].value : null;
                };
            };
        };
        // Calls the 'getValues' function.
        getValues();
        // Grabs the value of the 'name' input and assigns it userInfo.name.
        userInfo.username = createNewUser.username.value.trim();
        // Grabs the value of the 'email' input and assigns it userInfo.email.
        userInfo.email = createNewUser.email.value.trim();
        // Grabs the value of the 'desciption' input and assigns it userInfo.desciption.
        userInfo.password = createNewUser.password.value.trim();
        // Function that sends a POST request to the server to create the resource in the database.
        const inputNewUser = () => {
            const token = window.localStorage.getItem('api_token');
            // 'Fetch' request to a url that the server is listening at.
            fetch("http://localhost:8000/signup", {
                // Type of 'fetch' is a post.
                method: "POST",
                // Informs app that the type of data that will sent with 'fetch' will be a json object.
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                // Sets what will be the req.body for the server.
                body: JSON.stringify(userInfo),
            })
                // On successful update, set 'enterUser' to true.
                .then((data) => {
                    if (data.status === 400) {
                        setError('Email already registered.');
                    } else {
                        setError('');
                        setEnterUser(true);
                    }
                })
                // If there is an error, catch it and set 'error'.
                .catch(function (err) {
                    setError(err);
                })

        };
        // Calls the 'inputNewUser' function.
        inputNewUser();
    };
    return (
        <div>
            <div
                id='appHeader'
                className='zipcodeButtonDiv'
            >
                <h1
                    id='appH1'
                    className='searchH1'
                >
                    <span id='bannerSpan'>{enterUser ? 'user successfully entered' : 'enter user'}</span>
                    {enterUser ? <span className='loginSpan'>
                        <button
                            className='reactButton'
                            onClick={() => window.location.reload()}
                        >
                            enter another?
                        </button>
                    </span> :<div
                        id='navLinkDiv'
                    >
                        <Link
                            className='reactButton navLink'
                            to={'/users'}
                            key={'navUsers'}
                            id={'users'}
                        >
                            back to users
                        </Link>
                    </div>}
                </h1>
            </div>
            <section id="pageBody">
                <h2 id='errorH2'>
                    {error && error}
                </h2>
                {/* If the value of 'enterResource' is 'false', then display nothing. Else display the form. */}
                {enterUser ? 
                    null :
                    <form
                        id='createNewUser'
                        name='createNewUser'
                        className='appForm'
                        onSubmit={(event) => createUser(event)}
                    >
                        <input
                            id='username' name='username' placeholder='username' required />
                        <input id='email' name='email' placeholder='email' type='email' />
                        <input id='password' name='password' placeholder='password' />
                        <li id='keywords'>Keywords</li>
                        <StatusButtons />
                        <button id="enterButton" className="postButton" type="submit">enter new?</button>
                    </form>}
            </section>
        </div>
    );
};

export default UserForm;
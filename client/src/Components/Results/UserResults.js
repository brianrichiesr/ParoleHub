// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import BackToTopButtons from '../Buttons/BackToTopButtons';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Spinner } from 'react-bootstrap';

// Functional component that will return resources within a 45 mile radius of the zip code provided by the user..
const UserResults = () => {
    // Set the state of 5 consts with useState.
    const [results, setResults] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersMessage, setUsersMessage] = useState('users');
    // Declares consts based on info in url.
    const path = window.location.href.split('/');
    const id = path[3].split('#')[1];
    /* Async function for useEffect. Will effectively fetch data when called. Got help for this from https://canvas.tlm.cloud/courses/74/pages/intro-to-hooks-part-3?module_item_id=50820. */
    const getUsers = () => {
        // Resets 'error' to an empty string.
        setError('');
        /* Tries to fetch data. If the fetch is successful, function will call the 'getResources' function using the result as an argument. If the fetch was not successful, the response will either be a message to let the user know that the zip code requested does not exist in California or it will be an error and will set 'error' to the response's 'error.message'. */
        const token = window.localStorage.getItem('api_token');
        fetch('http://localhost:8000/users', {
            // Type of 'fetch' is a post.
            method: 'GET',
            // Informs app that the type of data that will sent with 'fetch' will be a json object.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            // Grabs the json object returned by the server and makes it available for next promise.
            .then((response) => {
                return response.json();
            })
            // Uses values from the returned object for this promise.
            .then((data) => {
                /* If data has a message property, set 'message' to the value of the message. If not, set the message based on singular or plural results. 'SetResult' to the results. */
                if(data.message) {
                    setMessage(data.message);
                    setMessage(false);
                } else {
                    setResults(data.users)
                    setTotalUsers(data.users.length);
                    data.users.length === 1 ? setUsersMessage('user') : setUsersMessage('users');
                    /* If the 'id' exists within the results and 'propBool' is set to true, scroll to the element with that id. Else, scroll to the top. */
                    if (id) {
                        const element = document.getElementById(`${id}`);
                        if (element) {
                            element.scrollIntoView({ behavior: 'instant', block: 'center' });
                        } else {
                            setError('Cannot scroll to the #id in the url.');
                            const newElement = document.getElementById('resultsTop');
                            newElement.scrollIntoView({ behavior: 'instant', block: 'center' });
                        }
                    } else {
                        const element = document.getElementById('resultsTop');
                        const pageTop = document.getElementById('pageTop');
                        if (element) {
                            element.scrollIntoView({ behavior: 'instant', block: 'center' });
                        }
                        if (pageTop) {
                            pageTop.scrollIntoView({ behavior: 'instant', block: 'center' });
                        }
                    }
                }
            })
            // If there is an error, catch it and set 'error'.
            .catch(function (err) {
                console.log('user err', err, window.location);
                setError(err);
            });
    }
    /* Function that removes the scroll functionality from the body element when displaying a list of results or an individual result. */
    const adjustBodyScroll = (bool) => {

        if (bool) {
            let bodyElement = document.getElementById("body");
            bodyElement.classList.add("bodyScrollAdjustment");
        } else {
            let bodyElement = document.getElementById("body");
            bodyElement.classList.remove("bodyScrollAdjustment");
        }
        
    }
    /* useEffect hook. When component mounts, the page sends a 'fetch' request. Will run functionality when 'fetch' updates variables based on the results of the search. Will either set 'state' of 'message' or call 'getUsers' function. Empty array as second argument to avoid activating the effect hook whenever the component updates. Also makes sure the list of filters disappears by changing its className to 'asideLeft'. */
    useEffect(() => {
        // Declares a custom error message.
        getUsers();
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
        let mainAppDiv = document.getElementById('mainAppDiv');
        if (mainAppDiv) {
            mainAppDiv.classList.remove('marginRightAdjustment');
        }
        adjustBodyScroll(true);
        return () => {
            adjustBodyScroll(false);
        }
    }, []);
    /* Returns a list of li elements of the search results. Only limited information is displayed for a result, but each li is a link to a page that will display all of the information of the result. */
    return (
        <>
            {error && error ? <h2 id='errorH2'>{error}</h2> : null}
            {!results.length && !message ? <h1 id='spinnerH1'>
                <Spinner animation='border' variant='warning' />
                <span id='spinnerSpan'>Loading...</span>
            </h1> : <div
            id='appHeader'
            className='zipcodeButtonDiv'
        >
            <h1
                id='appH1'
                className='searchH1'
            >
                <span id='bannerSpan'>
                    {totalUsers + ' ' + usersMessage}
                </span>
                {/* Maps through 'commands' and creates a button wrapped in a Link element. */}
                <div
                    id='navLinkDiv'
                >
                    <Link
                        to={'/users/enter'}
                        key='enter1'
                        id='userAddNew'
                        className={'reactButton navLink'}
                    >
                        add new?
                    </Link>
                </div>
            </h1>
        </div>}
            <hr id="headerHr"></hr>
            <div
                id='pageResults'
                className='usersPage'
            >
                <div id='resultsTop'></div>
                {/* If 'results' is not false, map through 'results' and create an li element wrapped in a Link that takes user to a page that will display the complete information of the result. */}
                {results ? results.map((item, idx) => (
                    <div
                        key={idx}>
                        <Link
                            to={`/${'users/' + item._id}`}
                            className={'resultLink'}
                        >
                            <li
                                className='resultLi userLi'
                                id={item._id}
                            >
                                <p className=' resultP'>
                                    User {idx + 1}
                                </p>
                                <p>
                                    <span className='importantText'>Name:</span> {item.username}
                                </p>
                                <p>
                                    <span className='importantText'>Email:</span> {item.email}
                                </p>
                                <p>
                                    <span className='importantText'>Status:</span> <span
                                            className='resultSpan'
                                        >{item.status}</span>
                                </p>
                            </li>
                        </Link>
                        <hr className={'resultHr'}></hr>
                    </div>
                )) : <li
                    className='resultLi'
                    key='message1'
                >
                    <p className='messageP'>
                            {message}
                    </p>
                </li>}
                <div className='bottomSpacerDiv'></div>
            </div>
            <BackToTopButtons />
        </>
    );
};

export default UserResults;
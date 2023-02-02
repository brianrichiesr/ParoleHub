// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import ZipcodeSearch from '../Search/ZipcodeSearch';
import BackToTopButtons from '../Buttons/BackToTopButtons';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Spinner } from 'react-bootstrap';

// Functional component that will return resources within a 45 mile radius of the zip code provided by the user..
const ResourceResults = (props) => {
    // Set the state of 5 consts with useState.
    const [results, setResults] = useState(false);
    const [pluralResults, setPluralResults] = useState('results');
    const [filterTrue, setFilterTrue] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null);
    // Functionality to hide/show list of filters.
    const filtersList = document.getElementById('filters');
    filtersList  ? filtersList.style.display = 'inline' : null;
    // Declare a variable as the zip code in the current url.
    let zipcode = window.location.href.split('/')[5].split('#')[0];
    let id = window.location.href.split('/')[5].split('#')[1] || null;

    /* Function that takes one argument that is an object of zip code data and returns a json object of resources that have a zip code that matches one of the zip codes in the argument. Sends a post request because get requests cannot set the req.body, which is needed to filter the data. */
    const getResources = (obj) => {
        let newObj = {...obj}
        newObj['filters'] = props.filters;
        // 'Fetch' request to a url that the server is listening at.
        const token = window.localStorage.getItem('api_token');
        fetch('http://localhost:8000/resources/getByZipcode/', {
            // Type of 'fetch' is a post.
            method: 'POST',
            // Informs app that the type of data that will sent with 'fetch' will be a json object.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // Sets what will be the req.body for the server.
            body: JSON.stringify(newObj),
        })
            // Grabs the json object returned by the server and makes it available for next promise.
            .then((response) => {
                return response.json();
            })
            // Uses values from the returned object for this promise.
            .then((data) => {
                /* If data has a message property, set 'message' to the value of the message. If the length of the data is greater than zero, sort the data by the distance from the zip code provided by the user and set 'results' equal to the sorted data. */
                if (props.keywords.length > 0 || props.restrictions.length > 0) {
                    setFilterTrue('filtered ');
                } else {
                    setFilterTrue('');
                }
                if (data.message) {
                    setMessage(data.message);
                    setResults(false);
                } else {
                    data.length === 1 ? setPluralResults('result') : setPluralResults('results');
                    let resources = [...data].sort((a, b) => (
                        a.distance - b.distance
                    ));
                    let keywordResultsArr = [];
                    let restrictionResultsArr = [];
                    let restrictionsBool = false;
                    let currentList = {};
                    let restrictionCount = 1;
                    /* For each element, if there are keywords and the element contains any keywords, and if the element is not already in the 'keywordResultsArr', push it into the 'keywordResultsArr'. */
                    resources.map((element) => {
                        if (props.keywords.length > 0) {
                            props.keywords.map((item) => {
                                if (element.keywords.includes(item)) {
                                    if (!keywordResultsArr.includes(element)) {
                                        keywordResultsArr.push(element);
                                    }
                                }
                            })
                        } else {
                            keywordResultsArr.push(element);
                        }
                        keywordResultsArr.length === 1 ? setPluralResults('result') : setPluralResults('results');
                    })
                    /* If there are restrictions, and the element contains all of the restrictions, and if the element is not already in the 'restrictionResultsArr', push it in the 'restrictionResultsArr'. */
                    if (props.restrictions.length > 0) {
                        restrictionsBool = true;
                        keywordResultsArr.map((element) => {
                            let bool = true;
                            props.restrictions.map((item) => {
                                if (item === `290's Accepted`) {
                                    if(element.restrictions.includes(`No 290's`)) {
                                        bool = false;
                                    } else if (element.keywords.includes('Housing')) {
                                        bool = true;
                                    } else if (element.keywords.includes('Transitional House')) {
                                        bool = true;
                                    } else {
                                        bool = false;
                                    }
                                } else if (!element.restrictions.includes(item)) {
                                    bool = false;
                                }
                            })
                            if (bool) {
                                if (!restrictionResultsArr.includes(element)) {
                                    restrictionResultsArr.push(element);
                                    currentList['result_' + restrictionCount] = {
                                        id: element['_id'],
                                        distance: element['distance'].toFixed(2),
                                        result: restrictionCount,
                                    };
                                    restrictionCount++;
                                }
                            }
                        })
                        restrictionResultsArr.length === 1 ? setPluralResults('result') : setPluralResults('results');
                    } else {
                        keywordResultsArr.map((element, idx) => {
                            currentList['result_' + (idx + 1)] = {
                                id: element['_id'],
                                distance: element['distance'].toFixed(2),
                                result: (idx + 1),
                            }
                        })
                    }
                    /* If the 'restrictionResultsArr' contains any results, setResults to 'restrictionResultsArr'. Else, if the 'keywordResultsArr' contains any results, setResults to 'keywordResultsArr'. Else, setResults to 'false' and setMessage to the message below. */
                    restrictionResultsArr.length > 0 ? setResults(restrictionResultsArr) : (!restrictionsBool && keywordResultsArr.length > 0 ? setResults(keywordResultsArr) : setResults(false), setMessage('Sorry, no resources that meet your requirements within 45 miles of this Zip Code.'));
                    window.localStorage.setItem('currentList', JSON.stringify(currentList));
                }
            })
            /* If the 'id' exists within the results and 'propBool' is set to true, scroll to the element with that id. Else, scroll to the top. */
            .then(() => {
                if (id && props.propBool) {
                    const element = document.getElementById(`${id}`);
                    if (element) {
                        element.scrollIntoView({ block: 'center', behavior: 'instant' });
                    }
                } else {
                    const element = document.getElementById(`resultsTop`);
                    if (element) {
                        element.scrollIntoView({ block: 'center', behavior: 'instant' });
                    }
                }
            })
            // If there is an error, catch it and set 'error'.
            .catch(function (err) {
                setError(err);
            });
    };

    /* Async function for useEffect. Will effectively fetch data when called. Got help for this from https://canvas.tlm.cloud/courses/74/pages/intro-to-hooks-part-3?module_item_id=50820. */
    const getSearchResults = () => {
        // Resets 'error' to an empty string.
        setError('');
        /* Tries to fetch data. If the fetch is successful, function will call the 'getResources' function using the result as an argument. If the fetch was not successful, the response will either be a message to let the user know that the zip code requested does not exist in California or it will be an error and will set 'error' to the response's 'error.message'. */
        const token = window.localStorage.getItem('api_token');
        fetch('http://localhost:8000/search/zipcodes/' + zipcode, {
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
                /* If data has a message property, set 'message' to the value of the message. If the length of the data is greater than zero, sort the data by the distance from the zip code provided by the user and set 'results' equal to the sorted data. */
                if (data.message) {
                    setMessage(data.message);
                    setResults(false);
                } else {
                    getResources(data);
                }
            })
            // If there is an error, catch it and set 'error'.
            .catch(function (err) {
                setError(err);
            });
    }
    /* useEffect hook. When component mounts, the page sends a 'fetch' request. Will run functionality when 'fetch' updates variables based on the results of the search. Will either set 'state' of 'message' or call 'getSearchResults' function. 'props' as second argument to activate the effect hook whenever the user selects filters to the search results. Checks if the zip code provided by the user is a California zip code. As the app expands, the numbers will altered. If the zip code provided is not within the limits, set 'message'. */
    useEffect(() => {
        // Declares a custom error message.
        const ooops = 'You have not entered a valid Zip Code. Please try again.'
        // If what the user inputs cannot be converted to a number, set 'message'.
        if (isNaN(zipcode)) {
            setMessage('A zipcode is only numbers. ' + ooops);
            setResults(false);
            // If what the user inputs is not 5 numbers long, set 'message'.
        } else if (zipcode.length !== 5) {
            setMessage('A zipcode is 5 numbers long. ' + ooops);
            setResults(false);
            // If what the user inputs is not within the California Zip Codes, set 'message'.
        } else if (zipcode < 90000 || zipcode > 96163) {
            setMessage('Sorry, no resources for this Zip Code. This app is designed only for Caliornia at this time. Please try again.');
            setResults(false);
            // Else call the 'getSearchResults' function.
        } else {
            getSearchResults();
        }
    }, [props]);
    /* Returns a list of li elements of the search results. Only limited information is displayed for a result, but each li is a link to a page that will display all of the information of the result. */
    return (
        <>
            {error && error ? <h2 id='errorH2'>{error}</h2> : null}
            {!results.length && !message ? <h1 id='spinnerH1'>
                <Spinner animation='border' variant='warning' />
                <span id='spinnerSpan'>Loading...</span>
            </h1> : <ZipcodeSearch
                    banner={(results.length || 0) + ' ' + filterTrue + pluralResults + ' for ' + zipcode}
                    key={'banner1'} />}
            <div
                id='pageResults'
            >
                <div id='resultsTop'></div>
                {/* If 'results' is not false, map through 'results' and create an li element wrapped in a Link that takes user to a page that will display the complete information of the result. */}
                {results ? results.map((item, idx) => (
                    <div
                        className='resultDiv'
                        key={idx}>
                        <Link
                            to={`/${'search/zipcodes/' + zipcode + '/' + item._id + '/' + item.distance.toFixed(2) + '/' + (idx + 1)}`}
                            className={'resultLink'}
                        >
                            <li
                                className='resultLi'
                                id={item._id}
                            >
                                <p className=' resultP'>
                                    Result {idx + 1}
                                </p>
                                <p>
                                    <span className='importantText'>Name:</span> {item.name}
                                </p>
                                <p>
                                    <span className='importantText'>City:</span> {item.city}
                                </p>
                                <p>
                                    <span className='importantText'>Keywords:</span>
                                        <span
                                        className='resultSpan'
                                    >
                                        {' ' + item.keywords.join(', ')}
                                    </span>
                                </p>
                                <p>
                                    <span className='importantText'>
                                        Distance From Chosen Zip Code:
                                    </span> Approx.
                                    <span
                                        className='resultSpan'
                                    >
                                        {' ' + item.distance.toFixed(2)}
                                    </span> miles
                                </p>
                                <p>
                                    <span className='importantText'>Restrictions:</span>
                                    <span
                                        className='resultSpan'
                                    >
                                        {' ' + item.restrictions.join(', ')}</span>
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

export default ResourceResults;
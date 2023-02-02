// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import CountySearch from '../Search/CountySearch';
import BackToTopButtons from '../Buttons/BackToTopButtons';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Spinner } from 'react-bootstrap';

// Functional component that will return resources within a county provided by the user.
const CountyResults = (props) => {
    // Set the state of 5 consts with useState.
    const [results, setResults] = useState(false);
    const [pluralResults, setPluralResults] = useState('results');
    const [filterTrue, setFilterTrue] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null);
    // Functionality to hide/show list of filters.
    const filtersList = document.getElementById('filters');
    filtersList  ? filtersList.style.display = 'inline' : null;
    // Declare a variable as the county in the current url and removes the '%20's.
    let testedCounty = window.location.href.split('/')[5].split('#')[0].split('%20');
    if (testedCounty[testedCounty.length - 1].toLowerCase() !== 'county') {
        testedCounty[testedCounty.length] = 'County'
    }
    let county = testedCounty.join(' ');
    // Declare a variable as the id of a resource in the current url or set it to a value of null.
    let id = window.location.href.split('/')[5].split('#')[1] || null;    
    /* Function that takes one argument that is a county and returns a json object of resources that have a county that matches one of the county in the argument. Sends a post request because get requests cannot set the req.body, which is needed to filter the data. */
    const getResources = (county) => {
        setError('');
        let newObj = {
            'county': county,
            'filters': props.filters
        }
        // 'Fetch' request to a url that the server is listening at.
        const token = window.localStorage.getItem('api_token');
        fetch('http://localhost:8000/resources/getByCounty/' + county, {
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
                /* If data has a message property, set 'message' to the value of the message. If the length of the data is greater than zero, sort the data by the zip codes in the data and set 'results' equal to the sorted data. */
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
                        a.zip - b.zip
                    ));
                    let keywordResultsArr = [];
                    let restrictionResultsArr = [];
                    let restrictionsBool = false;
                    let currentCountyList = {};
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
                        keywordResultsArr.map(element => {
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
                                    currentCountyList['result_' + restrictionCount] = {
                                        id: element['_id'],
                                        result: restrictionCount,
                                    };
                                    restrictionCount++;
                                }
                            }
                        })
                        restrictionResultsArr.length === 1 ? setPluralResults('result') : setPluralResults('results');
                    } else {
                        keywordResultsArr.map((element, idx) => {
                            currentCountyList['result_' + (idx + 1)] = {
                                id: element['_id'],
                                result: (idx + 1),
                            }
                        })
                    }                    
                    /* If the 'restrictionResultsArr' contains any results, setResults to 'restrictionResultsArr'. Else, if the 'keywordResultsArr' contains any results, setResults to 'keywordResultsArr'. Else, setResults to 'false' and setMessage to the message below. */
                    restrictionResultsArr.length > 0 ? setResults(restrictionResultsArr) : (!restrictionsBool && keywordResultsArr.length > 0 ? setResults(keywordResultsArr) : setResults(false), setMessage('Sorry, no resources for this County.'));
                    window.localStorage.setItem('currentCountyList', JSON.stringify(currentCountyList));
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
    /* useEffect hook. When component mounts, the page sends a 'fetch' request. Will run functionality when 'fetch' updates variables based on the results of the search. Will either set 'state' of 'message' or call 'getResources' function. 'props' as second argument to activate the effect hook whenever the user selects filters to the search results. Checks if the county provided by the user is a word. If not, set 'message'. */
    useEffect(async () => {
        // Declares a custom error message.
        const ooops = 'You have not entered a valid County. Please try again.'
        // If what the user inputs can be converted to a number, set 'message' and set 'results' to false to remove results from display.
        if (!isNaN(county)) {
            setMessage('A county is not numbers. ' + ooops);
            setResults(false);
            // If what the user inputs is a string, call 'getResources' function with the string.
        } else {
            await getResources(county);
        }
    }, [props]);
    /* Returns a list of li elements of the search results. Only limited information is displayed for a result, but each li is a link to a page that will display all of the information of the result. */
    return (
        <>
            {error && error ? <h2 id='errorH2'>{error}</h2> : null}
            {!results.length && !message ? <h1 id='spinnerH1'>
                <Spinner animation='border' variant='warning' />
                <span id='spinnerSpan'>Loading...</span>
            {/* Abbreviates the 'county' if it is longer than 15 characters. */}
            </h1> : <CountySearch
                    banner={(results.length || 0) + ' ' + filterTrue + pluralResults + ' for "' + (county.length > 15 ? county.toLowerCase().slice(0, 15) + '..."' : county.toLowerCase() + '"')}
                    key={'banner1'} />}
            <div
                id='pageResults'
            >
                <div id='resultsTop'></div>
                {/* If 'results' is not false, map through 'results' and create an li element wrapped in a Link that takes user to a page that will display the complete information of the result. */}
                {results ? results.map((item, idx) => (
                    <div
                        key={idx}>
                        <Link
                            to={`/${'search/county/' + county + '/' + item._id + '/' + (idx + 1)}`}
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
                                    <span className='importantText'>Zip:</span> {item.zip}
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

export default CountyResults;
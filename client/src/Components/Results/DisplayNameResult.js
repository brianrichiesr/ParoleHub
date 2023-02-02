// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import BackToTopButtons from '../Buttons/BackToTopButtons';
// Import images from Images folder.
import Images from '../../data/ResourceImages';

/* Functional component that displays the selected resource from the list of search results. */
const DisplayNameResult = (props) => {
    // Set the state of 2 consts with useState.
    const [resource, setResource] = useState({});
    const [error, setError] = useState('');
    // Declare variables whose values depend on the url.
    const path = window.location.href.split('/');
    const resourceName = path[5].split('%20').join(' ');
    const id = path[6];
    const resultNum = path[7];
    // Sets a limit based on the number of search results
    let limit = 0;
    let currentNameList = JSON.parse(window.localStorage.getItem('currentNameList'));
    for (let idx in currentNameList) {
        limit++;
    }
     /* If there are no results, sends the user back to the 'NameResults' page to select another option. */
    if (limit === 0) {
        let newUrl = path.slice(0,6).join('/');
        window.location.href = newUrl;
    }    
    // Small for in loop to get the number of images in 'Images' object.
    let totalImages = 0;
    for (let each in Images) {
        totalImages++
    };
    // Declare a variable whose value is the modulus of the result number divided by 'totalImages'.
    const imageNumber = resultNum % totalImages;
    // Sets an image address from 'ResourceImages' to variable to be used in an img tag based on 'imageNumber'.
    const imageSrc = "/resourceImages/image" + imageNumber + ".jpeg";
    /* Checks where in the list of results the result to be displayed is. If it is the first in the list, the 'previous' button is disabled. If it is the last in the list, the 'next' button is disabled. */
    const prevDisable = limit === 0 ? 'disabled' : (Number(resultNum) === 1 ? 'disabled' : '');
    const nextDisable = limit === 0 ? 'disabled' : (Number(resultNum) === limit ? 'disabled' : '');
     /* Function that grabs the info for the result that is previous to the result displayed from the current list in localStorage. Then sends the user to an url that displays the previous result. */
    const previousResult = (e) => {
        e.preventDefault();
        let newResult = 'result_' +(Number(resultNum) - 1)
        let newPath = [...path];
        newPath[6] = currentNameList[newResult].id;
        newPath[7] = currentNameList[newResult].result;
        newPath = newPath.join('/');
        window.location.href = newPath;
    }
    /* Function that grabs the info for the result that follows the result displayed from the current list in localStorage. Then sends the user to an url that displays the following result. */
    const nextResult = (e) => {
        e.preventDefault();
        let newResult = 'result_' +(Number(resultNum) + 1)
        let newPath = [...path];
        newPath[6] = currentNameList[newResult].id;
        newPath[7] = currentNameList[newResult].result;
        newPath = newPath.join('/');
        window.location.href = newPath;
    }
    // Takes filter buttons out of the tab functionality.
    const filterButtonList = document.getElementsByClassName('filter');
    if (filterButtonList) {
        for (let key in filterButtonList) {
            if (key < filterButtonList.length) {
                filterButtonList[key].tabIndex = Number(-1);
            }
        }
    }
    /* Async function for useEffect. Will effectively fetch data when called. Got help for this from https://canvas.tlm.cloud/courses/74/pages/intro-to-hooks-part-3?module_item_id=50820. */
    const token = window.localStorage.getItem('api_token');
    const getResult = async () => {
        // Resets 'error' to an empty string.
        setError('');
        /* Tries to fetch data. If the fetch is successful, function will set 'resource' to the response. If not, will set 'error' to the response's 'error.message'. */
        fetch("http://localhost:8000/resources/" + id, {
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
                setResource(data);
            })
            // If there is an error, catch it and set 'error'.
            .catch(function (err) {
                setError(err);
            });
    };
    /* Sets 'props.setPropBool' to true to display results when user returns to the list of resource results. */
    const boolTrue = () => {
        props.setPropBool(true);
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
     /* useEffect hook. When component mounts, calls function 'getResult', closes 'filters' and adjusts for scrollbar. Empty array as second argument to avoid activating the effect hook whenever the component updates. */
    useEffect(() => {
        getResult();
        document.getElementById('pageTop')
        .scrollIntoView({
            behavior: "instant"
        });
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
        adjustBodyScroll(true);
        return () => {
            adjustBodyScroll(false);
        }
    }, []);

    // Returns an li that displays the info from the fetch or the error.
    return (
        <div>
            <div id='mainBody'>
                <div id='mb1'>
                    <h1 id='searchH1'>
                        <span id='bannerSpan'>
                            {/* Abbreviates the 'resourceName' if it is longer than 15 characters. */}
                            search for "{(resourceName.length > 15 ? resourceName.toLowerCase().slice(0, 15) + '...' : resourceName.toLowerCase())}"
                        </span>
                    </h1>
                </div>
                {/* Link that will send user to an update page that will allow user to update the current resource. */}
                {props.userStatus === 'user' ?
                    <div id='mb4'>
                        <span id='displayLiButtonDiv'>
                            {/* Link that will return user back to the list of results from the name search.*/}
                            <Link
                                id={'returnToListButton'}
                                onClick={() => boolTrue()}
                                to={`/${'search/name/' + resourceName + '#' + id}`}
                                key={2}
                                className={'reactButton navLink'}
                            >
                                return to list
                            </Link>                       
                        </span>
                    </div>
                    :<div id='mb3'> 
                        <span id='displayLiButtonDiv'>
                            {/* Link that will return user back to the list of results from the name search.*/}
                            <Link
                                id={'returnToListButton'}
                                onClick={() => boolTrue()}
                                to={`/${'search/name/' + resourceName + '#' + id}`}
                                key={2}
                                className={'reactButton navLink'}
                            >
                                return to list
                            </Link>                        
                        </span>
                        <span id='displayLiButtonDiv'>
                            {/* Link that will take user to the 'NameResourceUpdate' page.*/}
                            <Link
                                id={'updateResourceButton'}
                                to={`/${'resources/nameUpdate/' + id + '/' + resultNum + '/' + resourceName}`}
                                key={3}
                                className={'reactButton displayUpdate navLink'}
                            >
                                update
                            </Link>
                        </span>
                    </div> }
                {error && error ? <h2 id='errorH2'>{error}</h2> : null}
            </div>
            <hr className='displayHr'></hr>
            <div id='displayDiv'>
                <div id='resultsTop'></div>
                <div
                    id='imageDiv'
                    style={{backgroundImage: `url(${imageSrc})`}}
                >
                </div>
                <div id='displayLiDiv'>
                    {/* Takes the values of the 'resource' object and displays them for user. */}
                    <li
                        key={1}
                        className='resultLi displayLi'
                    >
                        <p className='resultP'>
                            Result {resultNum}
                        </p>
                        <p>
                            <span className='importantText'>Name:</span> {resource.name}
                        </p>
                        <p>
                            <span className='importantText'>Address:</span> {resource.address}
                        </p>
                        <p>
                            <span className='importantText'>City:</span> {resource.city}
                        </p>
                        <p>
                            <span className='importantText'>State:</span> {resource.state}
                        </p>
                        <p>
                            <span className='importantText'>Zip:</span> {resource.zip}
                        </p>
                        <p>
                            <span className='importantText'>County:</span> {resource.county}
                        </p>
                        <p>
                            <span className='importantText'>Website:</span> {resource.website || ''}
                        </p>
                        <p>
                            <span className='importantText'>Phone:</span> {resource.tel_number}
                        </p>
                        <p>
                            <span className='importantText'>Email:</span> {resource.email}
                        </p>
                        <p>
                            <span className='importantText'>Keywords:</span>
                            <span className='resultSpan'>
                                {/* If 'resource.keywords' exists, join the indexes with a comma and a space. If not, display nothing. */}
                                {resource.keywords ? ' ' + resource.keywords.join(', ') : null}
                            </span>
                        </p>
                        <p>                            
                            <span className='importantText'>Restrictions:</span>
                            <span className='resultSpan'>
                                {/* If 'resource.restrictions' exists, join the indexes with a comma and a space. If not, display nothing. */}
                                {resource.restrictions ? ' ' + resource.restrictions.join(', ') : null}
                            </span>
                        </p>
                        <p>
                            <span className='importantText'>Description:</span>{resource.description ?  ' ' + resource.description : null}
                        </p>
                    </li>
                    <div id='changeResultDiv'>
                        <button
                            id='prevButton'
                            className={'changeButton ' + prevDisable}
                            disabled={prevDisable}
                            onClick={(e) => previousResult(e)}
                        >
                            previous
                        </button>
                        <button
                            id='nextButton'
                            className={'changeButton ' + nextDisable}
                            disabled={nextDisable}
                            onClick={(e) => nextResult(e)}
                        >
                            next
                        </button>
                        <div className='liSpacerDiv'></div>
                    </div>
                </div>
            </div>
            <div className='wideScreensOnly'>
                <BackToTopButtons />
            </div>
        </div>
    );
};

export default DisplayNameResult;
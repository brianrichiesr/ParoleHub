// Richie T-57866

// Import the necessary modules from react.
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

/* Functional component that creates an input field for Zip Codes and a button to initiate a search based on the Zip Code the user inputs. Will only receive props if called from the 'ResourceResults' page. */
const ZipcodeSearch = (props) => {
    /* Declares the state of a variable that will be used to hide/display the list of filters for the resource results. */
    const [filterOpen, setFilterOpen] = useState(false);
    // Declares a const as a string.
    const banner = 'zipcode searched';
    // Function that takes one argument (the event), and sends the user to a url based on the Zip Code the user inputs into the input field.
    const searchByZipcode = (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Declares a const equal to the value of the input.
        let zip = document.forms.searchedByZipcode.zip.value;
        if (!props.banner) {
            /* If props.banner does not exist, send the user to the current url plus / and the Zip Code that the user inputs. */
            props.history.push('zipcodes/' + zip)
        //  Else replace the last param of the current url with 'zip' and send user to that address. 
        } else {
            const list = document.getElementById('filters');
            list.className = 'asideLeft';
            props.history.push(zip);
        };
        document.forms.searchedByZipcode.zip.value = '';
    };
    /* If the list of filters is showing and the user clicks anything in the list, do nothing. Else, hide the list of filters. */
    const closeFilter = (e) => {

        if (e.type === 'click' && (e.target.className.includes('noClick'))) {
            return;
        }
        setFilterOpen(false);
    }
    /* If the list of filters is hidden, show it. Else, hide it. */
    const filterIt = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFilterOpen(!filterOpen);
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
    /* When the page loads, add event listeners so that when the user clicks outside of the list of filters or scrolls the page in formats smaller than desktop, hide the list of filters. The page also adjusts for scrollbar. Second argument is an empty array so that the effect happens only once. */
    useEffect(() => {
        let mainAppDiv = document.getElementById('mainAppDiv');
        if (mainAppDiv) {
            mainAppDiv.classList.add('marginRightAdjustment');
        }
        adjustBodyScroll(true);
        document.body.addEventListener('scroll', closeFilter, false);
        document.body.addEventListener('click', closeFilter, false);
        // App will run the function that is returned when the component unmounts.
        return () => {
            adjustBodyScroll(false);
            document.body.removeEventListener('scroll', closeFilter, false);
            document.body.removeEventListener('click', closeFilter, false);
        }
    }, []);
    /* Fucntions that run when the state of 'filterOpen' changes. */
    useEffect(() => {
        const list = document.getElementById('filters');
        const btn = document.getElementById('filterButton');
        const open = document.getElementById('open');
        const close = document.getElementById('close');
        const spacer = document.getElementById('spacerButton');
        const page = document.getElementById('pageResults');
        const search = document.getElementById('searchH1');
        const filterButtonList = document.getElementsByClassName('filter');
        if(!filterOpen) {
            list.className = 'asideLeft';
            btn.className = 'reactButton keyword';
            spacer.className = 'reactButton keyword spacerButton';
            search.className = '';
            // If the list of filters is not showing, disable the tab to functionality.
            if (filterButtonList) {
                for (let key in filterButtonList) {
                    if (key < filterButtonList.length) {
                        filterButtonList[key].tabIndex = Number(-1);
                    }
                }
            }
            if (page) {
                page.className = '';
            }
            open.style['display'] = 'inline';
            close.style['display'] = 'none';
        } else {
            list.className = 'asideLeft showAside';
            btn.className = 'reactButton keyword filterFocus';
            spacer.className = 'reactButton keyword spacerButton showMe';
            search.className = 'adjustSearchH1';
            // If the list of filters is showing, enable the tab to functionality.
             if (filterButtonList) {
                for (let key in filterButtonList) {
                    if (key < filterButtonList.length) {
                        filterButtonList[key].tabIndex = Number(0);
                    }
                }
            }
            if (page) {
                page.className = 'pageAdjust';
            }
            open.style['display'] = 'none';
            close.style['display'] = 'inline';
            const element = document.getElementById('filterTitle');
            if (element) {
                element.scrollIntoView({ behavior: 'instant' });
            }
        }
    }, [filterOpen] );

    return (
        <div>
            <div id='mainBody'>
                {/* The content of the h1 will either be props.banner if it exists or 'banner' which was previously declared. */}
                <div id='mb1'>
                    <h1 id='searchH1'>
                        <span id='bannerSpan'>
                            {props.banner || banner}
                        </span>
                    </h1>
                </div>
                <div id='mb2'>
                    <form
                        id='searchedBy'
                        name='searchedByZipcode'
                        onSubmit = {(event) => searchByZipcode(event)}
                    >
                        <input id='zip' name='zip' placeholder='input zip here' required />
                        <button id="searchButton" className="post" type="submit">search zip</button>
                    </form>
                    <div id='filterButtonDiv'>
                        <button
                            id={'spacerButton'}
                            className={'reactButton keyword spacerButton'}
                        ></button>
                        {/* When button is clicked, call 'filterIt'. */}
                        <button
                            id={'filterButton'}
                            className={'reactButton keyword'}
                            onClick={(event) => filterIt(event)}
                        >
                            filters   
                                <span
                                    id={'open'}
                                > open
                                </span>
                                <span
                                    id={'close'}
                                > close
                                </span>
                        </button>
                    </div>
                </div>
            </div>
            <hr id="headerHr"></hr>
        </div>
    );
};

export default withRouter(ZipcodeSearch);

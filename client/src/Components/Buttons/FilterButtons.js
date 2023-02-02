// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import './Buttons.css';

/* Functional component that maps through 2 arrays of Filters to create a selection of buttons that the user may choose as Filters for the resource s/he is either entering or updating. Will receive props only if requested by an update resource request. */
const Filters = (props) => {
    // Declares 4 consts of filters for resources. Can add more options in future versions.
    const filtersArray1 = ['Transitional House', 'Employment', 'Transportation', 'Mental Health', 'Reentry Resource',  'Self Help', 'Education',  'Health Care', 'Legal', 'Financial', 'Benefits', 'Counseling', 'Museum'];
    const filtersArray2 =['Housing', 'Food', 'Spiritual', 'Clothes', 'Identification', 'Alcohol Treatment', 'Drug Treatment', 'STOP Program', 'Social Security', 'Veterans', 'Library', 'Theater', 'Creative Arts'];
    const filtersArray3 = [`Coed Facility`, `Men Only`, `290's Accepted`, `Youth`];
    const filtersArray4 = [`Women Only`, `No 290's`, `No Lifers`];
    /* If 'group' is 'keyword', add 'str' to the arrays 'props.keywords' and 'window.localStorage.keywords'. Else, remove 'str' to the arrays 'props.restrictions' and 'window.localStorage.restrictions'.  */
    const setClicked = (group, str) => {
        group === 'keyword' ? (props.setKeywords([...props.keywords, str]), window.localStorage.setItem('keywords', [...props.keywords, str])) : (props.setRestrictions([...props.restrictions, str]), window.localStorage.setItem('restrictions', [...props.restrictions, str]))
    }
    /* If 'group' is 'keyword', remove 'str' to the arrays 'props.keywords' and 'window.localStorage.keywords'. Else, remove 'str' to the arrays 'props.restrictions' and 'window.localStorage.restrictions' */
    const removeClicked = (group, str) => {
        let arr = [];
        let newFilters = group === 'keyword' ? [...props.keywords] : [...props.restrictions];
        newFilters.map((item) => {
            if (item !== str) {
                return arr.push(item);
            }
        })
        group === 'keyword' ? (props.setKeywords(arr), window.localStorage.setItem('keywords', arr) ): (props.setRestrictions(arr), window.localStorage.setItem('restrictions', arr));
    }
    /* Function that adds 'clicked' to the className of the element clicked or removes it if it is already a part of the className. */
    const clickIt = (e) => {
        // Prevents the element's default functionality.
        e.preventDefault();
        // Seperates the className into an array.
        let text = e.target.className.split(' ');
        if(props.propBool) {
            props.setPropBool(false);
        }
        /* If the third index exists make it an empty string, else if the third index does not exist make it the string 'clicked'. */
        text[4] ? 
            (text[4] = '',
            removeClicked(text[1], e.target.value)) :
            (text[4] = 'clicked',
            setClicked(text[1], e.target.value)
            );
        // Reassign the element's className to a joining of the indexes of 'text'.
        e.target.className = text.join(' ');
    }
    /* Function that unclicks all 'keywords' and 'restrictions'. It also empties the 'props' and 'localStorage' arrays. */
    const clearFilters = (e) => {
        e.preventDefault();
        if(props.propBool) {
            props.setPropBool(false);
        }
        props.setKeywords([]);
        props.setRestrictions([]);
        window.localStorage.setItem('keywords', []);
        window.localStorage.setItem('restrictions', []);
    }
    // Declares a variable as an empty string.
    let click = '';
    return (
        <div
            id='filterContainer'
        >
            <p
                id={'filterTitle'}
                className='noClick'
            ></p>
            <div
                id='filterDiv'
                className='noClick'
            >
                <button
                    className={'reactButton keyword filter noClick'}
                    id={'refresh'}
                    tabIndex='-1'
                    onClick={(event) => clearFilters(event)}
                >
                    Refresh Filters
                </button>
                <p
                    className='noClick'
                >
                    Custom Search
                </p>
                <p
                    className='noClick'
                >
                    Keywords:
                </p>
                <div className='noClick keywordsDiv'>
                    <div className='noClick buttonBlock'>
                        {/* Maps through the 'filtersArray1' and if the index of the array exists in the 'filters' array, add the class 'clicked' to the button, or add an empty string. */}
                        {filtersArray1.map((item, idx) => {
                            props.keywords.includes(item) ? click=' clicked' : click='';
                            return <button
                                className={'reactButton keyword filter noClick' + click}
                                key={idx}
                                tabIndex='-1'
                                value={item}
                                onClick={(event) => clickIt(event)}
                            >
                                {item}
                            </button>
                        })}
                    </div>
                    <div className='noClick buttonBlock'>
                        {/* Maps through the 'filtersArray2' and if the index of the array exists in the 'filters' array, add the class 'clicked' to the button, or add an empty string. */}
                        {filtersArray2.map((item, idx) => {
                            props.keywords.includes(item) ? click=' clicked' : click='';
                            return <button
                                className={'reactButton keyword filter noClick' + click}
                                key={idx}
                                tabIndex='-1'
                                value={item}
                                onClick={(event) => clickIt(event)}
                            >
                                {item}
                            </button>
                        })}
                    </div>
                </div>
                <p
                    className='noClick'
                >
                    Restrictions:
                </p>
                <div className='noClick keywordsDiv'>
                    <div className='noClick buttonBlock'>
                        {/* Maps through the 'filtersArray1' and if the index of the array exists in the 'filters' array, add the class 'clicked' to the button, or add an empty string. */}
                        {filtersArray3.map((item, idx) => {
                            props.restrictions.includes(item) ? click=' clicked' : click='';
                            return <button
                                className={'reactButton restriction filter noClick' + click}
                                key={idx}
                                tabIndex='-1'
                                value={item}
                                onClick={(event) => clickIt(event)}
                            >
                                {item}
                            </button>
                        })}
                    </div>
                    <div className='noClick buttonBlock'>
                        {/* Maps through the 'filtersArray2' and if the index of the array exists in the 'filters' array, add the class 'clicked' to the button, or add an empty string. */}
                        {filtersArray4.map((item, idx) => {
                            props.restrictions.includes(item) ? click=' clicked' : click='';
                            return <button
                                className={'reactButton restriction filter noClick' + click}
                                key={idx}
                                tabIndex='-1'
                                value={item}
                                onClick={(event) => clickIt(event)}
                            >
                                {item}
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
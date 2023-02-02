// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import './Buttons.css';

/* Functional component that maps through 2 arrays of keywords to create a selection of buttons that the user may choose as keywords for the resource s/he is either entering or updating. Will receive props only if requested by an update resource request. */
const Keywords = (props) => {
    // Declares 2 consts of keywords for resources. Can add more options in future versions.
    const keywordsArray1 = ['Transitional House', 'Employment', 'Transportation', 'Mental Health', 'Reentry Resource', 'Self Help', 'Education',  'Health Care', 'Legal', 'Financial', 'Benefits', 'Counseling', 'Museum'];
    const keywordsArray2 = ['Housing', 'Food', 'Spiritual', 'Clothes', 'Identification', 'Alcohol Treatment', 'Drug Treatment', 'STOP Program', 'Social Security', 'Veterans', 'Library', 'Theater', 'Creative Arts'];
    // Declares a variable whose value depends on if props were received or not.
    const keywords = props.keywords || [''];
    /* Function that adds 'clicked' to the className of the element clicked or removes it if it is already a part of the className. */
    const clickIt = (e) => {
        // Prevents the element's default functionality.
        e.preventDefault();
        // Seperates the className into an array.
        let text = e.target.className.split(' ');
        /* If the third index exists make it an empty string, else if the third index does not exist make it the string 'clicked'. */
        text[2] ? text[2] = '' : text[2] = 'clicked';
        // Reassign the element's className to a joining of the indexes of 'text'.
        e.target.className = text.join(' ');
    }
    // Declares a variable as an empty string.
    let click = '';
    return (
        <div className='keywordsDiv'>
            <div className='buttonBlock'>
                {/* Maps through the 'keywordsArray1' and if the index of the array exists in the 'keywords' array, add the class 'clicked' to the button, or add an empty string. */}
                {keywordsArray1.map((item, idx) => {
                    keywords.includes(item) ? click=' clicked' : click='';
                    return <button
                        className={'reactButton keyword' + click}
                        key={idx}
                        value={item}
                        onClick={(event) => clickIt(event)}
                    >
                        {item}
                    </button>
                })}
            </div>
            <div className='buttonBlock'>
                {/* Maps through the 'keywordsArray2' and if the index of the array exists in the 'keywords' array, add the class 'clicked' to the button, or add an empty string. */}
                {keywordsArray2.map((item, idx) => {
                    keywords.includes(item) ? click=' clicked' : click='';
                    return <button
                        className={'reactButton keyword' + click}
                        key={idx}
                        value={item}
                        onClick={(event) => clickIt(event)}
                    >
                        {item}
                    </button>
                })}
            </div>
        </div>
    );
};

export default Keywords;
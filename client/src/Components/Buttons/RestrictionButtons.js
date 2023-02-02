// Richie T-57866  

//  Import the necessary modules from react.
import React from 'react';
import './Buttons.css';

/* Functional component that maps through 2 arrays of restrictions to create a selection of buttons that the user may choose as keywords for the resource s/he is either entering or updating. Will receive props only if requested by an update resource request. */
const RestrictionButtons = (props) => {
    // Declares 2 consts of restrictions for resources. Can add more options in future versions.
    const restrictionsArray1 = [`Coed Facility`, `Men Only`, `290's Accepted`, `Youth`];
    const restrictionsArray2 = [`Women Only`, `No 290's`, `No Lifers`];
    // Declares a variable whose value depends on if props were received or not.
    const restrictions = props.restrictions || [''];
    /* Function that adds 'clicked' to the className of the element clicked or removes it if it is already a part of the className. */
    const clickIt = (e) =>  {
        // Prevents the element's default functionality.
        e.preventDefault();
        // Seperates the className into an array.
        let text = e.target.className.split(' ');
        /* If the third index exists make it an empty string, else if the third index does not exist make it the string 'clicked'. */
        text[2] ? text[2] = '' : text[2] = 'clicked';
        // Reassign the element's className to a joining of the indexes of 'text'.
        e.target.className = text.join(' ');
    };
    // Declares a variable as an empty string.
    let click = '';
    return (
        <div className='restrictionsDiv'>
            <div className='buttonBlock'>
                {/* Maps through the 'restrictionsArray1' and if the index of the array exists in the 'restrictions' array, add the class 'clicked' to the button, or add an empty string. */}
                {restrictionsArray1.map((item, idx) => {
                    restrictions.includes(item) ? click=' clicked' : click='';
                    return <button
                        className={'reactButton restriction' + click}
                        key={idx}
                        value={item}
                        onClick={(event) => clickIt(event)}
                    >
                        {item}
                    </button>
                })}
            </div>
            <div className='buttonBlock'>
                {/* Maps through the 'restrictionsArray2' and if the index of the array exists in the 'restrictions' array, add the class 'clicked' to the button, or add an empty string. */}
                {restrictionsArray2.map((item, idx) => {
                    restrictions.includes(item) ? click=' clicked' : click='';
                    return <button
                        className={'reactButton restriction' + click}
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

export default RestrictionButtons;
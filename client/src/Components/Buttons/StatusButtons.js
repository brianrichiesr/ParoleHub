// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import './Buttons.css';

/* Functional component that maps through 2 arrays of Status to create a selection of buttons that the user may choose as Status for the resource s/he is either entering or updating. Will receive props only if requested by an update resource request. */
const Status = (props) => {
    // Declares 1 const of possible user statuses. Can add more options in future versions.
    const statusArray1 = ['admin', 'support', 'user'];
    // Declares a variable whose value depends on if props were received or not.
    const status = [props.status] || [''];
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

        let btnArray = document.getElementsByClassName('status');
        for (let i = 0; i < btnArray.length; i++) {
            if (btnArray[i].id !== e.target.id) {
                btnArray[i].className = 'reactButton status';
            }
        }
    }
    // Declares a variable as an empty string.
    let click = '';
    return (
        <div className='keywordsDiv'>
            <div className='buttonBlock'>
                {/* Maps through the 'statusArray1' and if the index of the array exists in the 'keywords' array, add the class 'clicked' to the button, or add an empty string. */}
                {statusArray1.map((item, idx) => {
                    if (idx === 2 && status[0] === undefined) {
                        return <button
                        className={'reactButton status clicked'}
                        key={idx}
                        id={'status' + idx}
                        value={item}
                        onClick={(event) => clickIt(event)}
                    >
                        {item}
                    </button>
                    } else {
                        status.includes(item) ? click=' clicked' : click='';
                        return <button
                            className={'reactButton status' + click}
                            key={idx}
                            id={'status' + idx}
                            value={item}
                            onClick={(event) => clickIt(event)}
                        >
                            {item}
                        </button>
                    }
                    
                })}
            </div>
        </div>
    );
};

export default Status;
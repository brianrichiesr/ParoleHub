// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import './Buttons.css';

/* Component that creates a button that when clicked will scroll to top of the current page. */
const BackToTopButtons = () => {
    return (
        <>
            {/* Button that will scroll to the top of the results on desktop or top of the page on laptops. Will only be displayed on devices of these sizes. */}
            <button
                id='backToTop'
                className='noClick'
                onClick={() => (
                    document.getElementById('resultsTop')
                    .scrollIntoView({
                        behavior: "instant",
                        block: 'center'
                    }),
                    document.getElementById('pageTop')
                    .scrollIntoView({
                        behavior: "instant",
                        block: 'center'
                    })
                )}
            >
                back to top
            </button>
            {/* Button that will scroll to the top of the page on devices '991px' or less. Will only be displayed on devices of these sizes. */}
            <button
                id='arrowToTop'
                className='noClick'
                onClick={() => (
                    document.getElementById('pageTop')
                    .scrollIntoView({
                        behavior: "instant"
                    })
                )}
            >
                <span id='emoji'>☝️</span>
                {/* index finger pointing up
                Unicode: U+261D U+FE0F, UTF-8: E2 98 9D EF B8 8F */}
            </button>
        </>
    );
};

export default BackToTopButtons;
// Richie T-57866

// Import the necessary modules from react.
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Functional component that displays an error page when user goes to an improper url. */
const Error = () => {
    // Uses 'useLocation' to grab the relevant url information for the error.
    const location = useLocation();
    // Declares a const that equals a string.
    const errorMessage = `Url ${location.pathname} not available with this app.`;
    useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, [])

    return (
        <div className = 'mainBody'>
            <h1 id='errorH1'>Error!!! Error !!! Error!!!</h1>
            <h2 id='errorH2'>
                {errorMessage}
            </h2>
        </div>
    );
};

export default Error;
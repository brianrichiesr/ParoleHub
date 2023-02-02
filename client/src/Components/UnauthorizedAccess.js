// Richie T-57866

// Import the necessary modules from react.
import React, { useEffect } from 'react';

/* Functional component that displays an error page when user goes to an improper url. */
const Error = () => {
    useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, [])

    return (
        <div className = 'mainBody'>
            <h1 id='errorH1'>Unauthorized Access!!!</h1>
            <h2 id='errorH2'>
                You have attempted to access a page of the app for which you do not have the proper authorization. Please use the app responsibly.
            </h2>
        </div>
    );
};

export default Error;
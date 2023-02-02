// Richie T-57866

// Import the necessary modules from react.
import React, { useEffect } from 'react';
import SearchButtons from "../Buttons/SearchButtons";
import './Searches.css';

const Searches = () => {
    /* useEffect hook. When component mounts, changes the className to close 'filters'. */
    useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, []);
    return (
        <SearchButtons />
    )
}

export default Searches;
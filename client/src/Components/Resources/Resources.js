// Richie T-57866

// Import the necessary modules from react.
import React, { useEffect } from 'react';
import ResourceButtons from '../Buttons/ResourceButtons';

const Resources = () => {
    /* useEffect hook. When component mounts, changes the className to close 'filters'. */
    useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, []);
    return (
        <ResourceButtons />
    )
}

export default Resources;
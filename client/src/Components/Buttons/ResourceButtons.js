// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import { Link } from "react-router-dom";
import './Buttons.css';

/* Functional component that maps through the 'commands' array and creates a button that when clicked on will link the user to url of the localhost/resources/(value of the index) for the value of each index. Designed to add more commands in the future versions. */
const ResourceButtons = () => {
    const commands = ['enter'];
    return (
        <div
            id='appHeader'
            className='resourceButtonDiv'
        >
            <h1
                id='appH1'
                className='resourcesH1'
            >
                <span id='bannerSpan'>
                    resources
                </span>
            {/* Maps through 'commands' and creates a button wrapped in a Link element. */}
            <div
                    id='navLinkDiv'
                >
                    {commands.map((item, idx) => (
                        <Link
                            to={'/resources/' + item}
                            key={idx}
                            className={'reactButton navLink'}
                        >
                            {item}
                        </Link>
                    ))}
            </div>
            </h1>
        </div>
    );
};

export default ResourceButtons;
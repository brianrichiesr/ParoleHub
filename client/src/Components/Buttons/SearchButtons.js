// Richie T-57866

// Import the necessary modules from react.
import React from 'react';
import { Link } from "react-router-dom";
import './Buttons.css';

/* Functional component that maps through the 'commands' array and creates a button that when clicked on will link the user to url of the localhost/zipcodes/(value of the index) for the value of each index. Designed to add more commands in the future versions. */
const SearchButtons = () => {
    const commands = ['zipcodes', 'county', 'name'];
    return (
        <div
            id='appHeader'
            className='zipcodeButtonDiv'
        >
            <h1
                id='appH1'
                className='searchH1'
            >
                <span id='bannerSpan'>
                    search by
                </span>
                {/* Maps through 'commands' and creates a button wrapped in a Link element. */}
                <div
                    id='navLinkDiv'
                >
                    {commands.map((item, idx) => (
                        <Link
                        to={'/search/' + item}
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

export default SearchButtons;
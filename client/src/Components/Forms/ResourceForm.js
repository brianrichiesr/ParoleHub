// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import KeywordButtons from '../Buttons/KeywordButtons';
import RestrictionButtons from '../Buttons/RestrictionButtons';
import BackToTopButtons from '../Buttons/BackToTopButtons';

/* Functional component that returns a form that the user can use to submit a new resource to the database. */
const ResourceForm = () => {
    /* Declares the state of a component as 'false' and the state of another component to an empty string.*/
    const [enterResource, setEnterResource] = useState(false);
    const [error, setError] = useState('');
     /* useEffect hook. When component mounts, closes 'filters' and adjusts for scrollbar. */
     useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, []);
    // Function that takes one argument (the event) and will be called when the form is submitted.
    const createResource = (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Declares a variable whose value is the form being used to enter a resource.
        const createNewResource = document.forms.createNewResource;
        /* Declares a variable whose properties are a match to the schema of a resource document in the mongo database. Includes 'rating', 'vote_count', and 'comments' for future versions. */
        let resourceInfo = {
            'name': '',
            'address': '',
            'city': '',
            'zip': 0,
            'state': '',
            'county': '',
            'tel_number': '',
            'website':'',
            'email': '',
            'keywords': [],
            'restrictions': [],
            'rating': 0,
            'vote_count': 0,
            'description': '',
            'comments': []
        };
        /* Function that grabs all the elements with 'reactButton' in it's className, and pushes each elements value into the appropriate array that is a value in the 'resourceInfo' object. */
        const getValues = () => {
            // Declares the elements into an array.
            const buttonArray = document.getElementsByClassName('reactButton');
            /* Declares a variable equal the length of 'buttonArray'. By default, react seems to add 'length', 'item', and 'namedItem' to 'buttonArray' when I iterate with a for in loop. So I set the 'limit' as a work around until I can research why react does that. */
            const limit = buttonArray.length;
            // For in loop to iterate 'buttonArray'.
            for (let item in buttonArray) {
                // If 'item' is less than 'limit'.
                if (item < limit) {
                    // Make an array from the className of the element in 'buttonArray' at the index of 'item'.
                    let key = buttonArray[item].className.split(' ');
                    /* If the third index of 'key' exists and it equals 'clicked', push the value of the button into the appropriate array in 'resourceInfo'. */
                    key[2] && key[2] === 'clicked' ? resourceInfo[key[1] + 's'].push(buttonArray[item].value) : null;
                };
            };
        };
        // Calls the 'getValues' function.
        getValues();
        // Grabs the value of the 'name' input and assigns it resourceInfo.name.
        resourceInfo.name = createNewResource.name.value.trim();
        // Grabs the value of the 'address' input and assigns it resourceInfo.address.
        resourceInfo.address = createNewResource.address.value.trim();
        // Grabs the value of the 'city' input and assigns it resourceInfo.city.
        resourceInfo.city = createNewResource.city.value.trim();
        // Grabs the value of the 'state' input and assigns it resourceInfo.state.
        resourceInfo.state = createNewResource.state.value.trim();
        // Grabs the value of the 'zip' input and assigns it resourceInfo.zip.
        resourceInfo.zip = createNewResource.zip.value.trim();
        // Grabs the value of the 'county' input and assigns it resourceInfo.county.
        resourceInfo.county = createNewResource.county.value.trim();
        // Grabs the value of the 'tel_number' input and assigns it resourceInfo.tel_number.
        resourceInfo.tel_number = createNewResource.tel_number.value.trim();
        // Grabs the value of the 'website' input and assigns it resourceInfo.website.
        resourceInfo.website = createNewResource.website.value.trim();
        // Grabs the value of the 'email' input and assigns it resourceInfo.email.
        resourceInfo.email = createNewResource.email.value.trim();
        // Grabs the value of the 'desciption' input and assigns it resourceInfo.desciption.
        resourceInfo.description = createNewResource.description.value.trim();
        // Function that sends a POST request to the server to create the resource in the database.
        const inputNewResource = () => {
            const token = window.localStorage.getItem('api_token');
            // 'Fetch' request to a url that the server is listening at.
            fetch("http://localhost:8000/resources", {
                // Type of 'fetch' is a post.
                method: "POST",
                // Informs app that the type of data that will sent with 'fetch' will be a json object.
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                // Sets what will be the req.body for the server.
                body: JSON.stringify(resourceInfo),
            })
                // On successful update, set 'enterResource' to true.
                .then(() => {
                    setEnterResource(true);
                })
                // If there is an error, catch it and set 'error'.
                .catch(function (err) {
                    setError(err);
                })

        };
        // Calls the 'inputNewResource' function.
        inputNewResource();
    };
    return (
        <div className='resourceForm'>
            <h1
                id='appH1'
                className='usersH1'
            >
                <span id='bannerSpan'>{enterResource ? 'resource successfully entered' : 'enter resource'}</span>
                <button
                    className={enterResource ? 'reactButton' : 'reactButton hidden'}
                    onClick={() => window.location.reload()}
                >
                    enter another?
                </button>
            </h1>
            <section id="pageBody">
                <div id='resultsTop'></div>
                <h2 id='errorH2'>
                    {error && error}
                </h2>
                {/* If the value of 'enterResource' is 'false', then display nothing. Else display the form. */}
                {enterResource ? 
                    null :
                    <form
                        id='createNewResource'
                        name='createNewResource'
                        className='appForm'
                        onSubmit={(event) => createResource(event)}
                    >
                        <div
                            id='appBlock'
                        >
                            <div
                                className='appForm'
                                id='enterResourceForm'
                            >
                                <li id='inputText'>Input Information</li>
                                <div
                                    id='enterResource'
                                >
                                    <input id='name' name='name' placeholder='name' required />
                                    <input id='address' name='address' placeholder='address' required />
                                    <input id='city' name='city' placeholder='city' required />
                                    <input id='state' name='state' placeholder='state' required />
                                    <input id='zip' name='zip' placeholder='zip' required />
                                    <input id='county' name='county' placeholder='county' required />
                                    <input id='tel_number' type='telephone' name='tel_number' placeholder='tel_number' />
                                    <input id='website' name='website' placeholder='website' type='website' />
                                    <input id='email' name='email' placeholder='email' type='email' />
                                </div>
                            </div>
                            <div
                                className='appButtons'
                            >
                                <li id='keywords'>Keywords</li>
                                <KeywordButtons />
                                <li id='restrictions'>Restrictions</li>
                                <RestrictionButtons />
                            </div>
                        </div>
                        <li id='descriptionText'>Description</li>
                        <textarea id='description'></textarea>
                        <button id="enterButton" className="postButton" type="submit">add new?</button>
                    </form>}
            </section>
            <BackToTopButtons />
        </div>
    );
};

export default ResourceForm;
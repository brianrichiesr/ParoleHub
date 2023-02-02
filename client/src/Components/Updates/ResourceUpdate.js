// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import KeywordButtons from '../Buttons/KeywordButtons';
import RestrictionButtons from '../Buttons/RestrictionButtons';
import BackToTopButtons from '../Buttons/BackToTopButtons';
import { Link } from 'react-router-dom/cjs/react-router-dom';

/* Functional component that returns a form that is populated with the information of the resource the user wishes to update. The user can make alterations to the data and submit the changes to the database. */
const ResourceUpdate = () => {
    // Declares some consts with some relevant url information.
    const path = window.location.href.split('/');
    const id = path[5];
    const zipcode = path[6];
    const distance = path[7];
    const resultNum = path[8];
    const filters = document.getElementById('filters');
    filters ? filters.style.display = 'none' : null;
    /* Declares a dummy object that matches the schema.  'restrictions', 'vote_count', and 'comments' will be added in future versions. */
    let resourceInfo = {
        'name': '',
        'address': '',
        'city': '',
        'zip': '',
        'state': '',
        'county': '',
        'tel_number': '',
        'website': '',
        'email': '',
        'keywords': [],
        'restrictions': [],
        'rating': 0,
        'vote_count': 0,
        'description': '',
        'comments': [],
    };
    // Sets the 'state' of 5 consts.
    const [updateResult, setUpdateResult] = useState(true);
    const [resourceDelete, setResourceDelete] = useState(false);
    const [resourceToBeUpdated, setResource] = useState(resourceInfo);
    const [error, setError] = useState('');
    const [requestError, setRequestError] = useState('');

    // Function that fetches the resource to be updated.
    const getResourceInfo = async () => {
        const token = window.localStorage.getItem('api_token');
        fetch('http://localhost:8000/resources/' + id, {
            // Type of 'fetch' is a post.
            method: 'GET',
            // Informs app that the type of data that will sent with 'fetch' will be a json object.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            // Grabs the object returned by the server and makes it available as json for next promise.
            .then((response) => {
                return response.json();
            })
            // Uses values from the returned object for this promise.
            .then((data) => {
                // Sets 'resource' to 'data'.
               if (data.unauth) {
                   window.location.href = '/unauthorizedaccess';
               } else if (data.message) {
                    setError(data.message + ' Check your url.');
                    setRequestError('Request Error');
               } else {
                    setResource(data);
               }
            })
            // If there is an error, catch it and set 'error'.
            .catch(function (err) {
                console.log('err', err)
            })
    }
    /* useEffect hook. When component mounts, calls function 'getResourceInfo'. Empty array as second argument to avoid activating the effect hook whenever the component updates. */
    useEffect(() => {
        getResourceInfo();
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, []);
    /* Function that takes the data that the user modified and uses it to update the resource. */
    const updateResourceInfo = (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Declares a variable whose value is the form being used to update a resource. 
        let updateResource = document.forms.updateResource;
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
        getValues();
        // Grabs the value of the 'name' input and assigns it resourceInfo.name.
        resourceInfo.name = updateResource.name.value.trim();
        // Grabs the value of the 'address' input and assigns it resourceInfo.address.
        resourceInfo.address = updateResource.address.value.trim();
        // Grabs the value of the 'city' input and assigns it resourceInfo.city.
        resourceInfo.city = updateResource.city.value.trim();
        // Grabs the value of the 'state' input and assigns it resourceInfo.state.
        resourceInfo.state = updateResource.state.value.trim();
        // Grabs the value of the 'zip' input and assigns it resourceInfo.zip.
        resourceInfo.zip = updateResource.zip.value.trim();
        // Grabs the value of the 'county' input and assigns it resourceInfo.county.
        resourceInfo.county = updateResource.county.value.trim();
        // Grabs the value of the 'tel_number' input and assigns it resourceInfo.tel_number.
        resourceInfo.tel_number = updateResource.tel_number.value.trim();
        // Grabs the value of the 'website' input and assigns it resourceInfo.website.
        resourceInfo.website = updateResource.website.value.trim();
        // Grabs the value of the 'email' input and assigns it resourceInfo.email.
        resourceInfo.email = updateResource.email.value.trim();
        // Grabs the value of the 'desciption' input and assigns it resourceInfo.desciption.
        resourceInfo.description = updateResource.description.value.trim();
        // Function that posts the updated data to the database.
        const postUpdatedResource = () => {
            // 'Fetch' request to a url that the server is listening at.
            const token = window.localStorage.getItem('api_token');
            fetch('http://localhost:8000/resources/update/' + id, {
                // Type of 'fetch' is a put.
                method: 'PUT',
                // Informs app that the type of data that will sent with 'fetch' will be a json object.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // Sets what will be the req.body for the server.
                body: JSON.stringify(resourceInfo),
            })
                // On successful update, set 'updateResult' to true.
                .then(() => {
                    setUpdateResult(true);
                })
                // If there is an error, catch it and set 'error'.
                .catch(function (err) {
                    setError(err);
                })
        }
        // Calls the 'postUpdatedResource' function.
        postUpdatedResource();
    }
    // Function that deletes the resource.
    const deleteResource = (e) => {
        e.preventDefault();
         // // 'Fetch' request to a url that the server is listening at.
         const token = window.localStorage.getItem('api_token');
         fetch('http://localhost:8000/resources/delete/' + id, {
             // Type of 'fetch' is a put.
             method: 'DELETE',
             // Informs app that the type of data that will sent with 'fetch' will be a json object.
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,
             }
         })
             // On successful update, set 'updateUser' to true.
             .then(() => {
                setResourceDelete(true);
                console.log('resource deleted');
             })
             // If there is an error, catch it and set 'error'.
             .catch(function (err) {
                 setError(err);
             })
    }

    return (
        <div className='resourceForm'>
            <div
                id='appHeader'
                className='zipcodeButtonDiv'
            >
                <h1
                    id='appH1'
                    className='searchH1'
                >
                    <span id='updateSpan'>{updateResult ? 'resource successfully updated' : (resourceDelete ? 'resource successfully deleted' : (requestError ? 'update resource ' + requestError : 'update resource'))}</span>
                    <div
                        id='navLinkDiv'
                    >
                        {resourceDelete ? <Link
                            to={`/${'search/zipcodes/' + zipcode}`}
                            key={98}
                            className={'reactButton navLink'}
                            id={'deleteLink'}
                        >
                            return to list
                        </Link> : <Link
                            to={`/${'search/zipcodes/' + zipcode + '/' + id + '/' + distance + '/' + resultNum}`}
                            key={99}
                            className={'reactButton navLink'}
                        >
                            back to resource
                        </Link>}
                    </div>
                </h1>
            </div>
            <section id='pageBody' className='updateSection'>
                <div id='resultsTop'></div>
                <h2 id='errorH2'>
                    {error && error}
                </h2>
                {/* If the value of 'updateResult' is 'true', then display a message to the user to inform them that their resource has been updated. Else display the form. */}
                {updateResult ?
                    null :
                        (resourceDelete ? null :
                            (requestError ? null :
                                <form
                                    id='updateResource'
                                    className='appForm'
                                    name='updateResource'
                                    onSubmit={(event) => updateResourceInfo(event)}
                                >
                                    <input
                                        id='name'
                                        name='name'
                                        defaultValue={resourceToBeUpdated.name}
                                    />
                                    <input
                                        id='address'
                                        name='address'
                                        defaultValue={resourceToBeUpdated.address}
                                    />
                                    <input
                                        id='city'
                                        name='city'
                                        defaultValue={resourceToBeUpdated.city}
                                    />
                                    <input
                                        id='zip'
                                        name='zip'
                                        defaultValue={resourceToBeUpdated.zip}
                                    />
                                    <input
                                        id='state'
                                        name='state'
                                        defaultValue={resourceToBeUpdated.state}
                                    />
                                    <input
                                        id='county'
                                        name='county'
                                        defaultValue={resourceToBeUpdated.county}
                                        placeholder='county'
                                    />
                                    <input
                                        id='tel_number'
                                        type='telephone' name='tel_number'
                                        defaultValue={resourceToBeUpdated.tel_number}
                                    />
                                    <input
                                        id='website'
                                        name='website'
                                        defaultValue={resourceToBeUpdated.website}
                                        type='website'
                                        placeholder='website'
                                    />
                                    <input
                                        id='email'
                                        name='email'
                                        defaultValue={resourceToBeUpdated.email}
                                        type='email'
                                        placeholder='email'
                                    />
                                    <li id='keywords'>
                                        Keywords
                                    </li>
                                    <KeywordButtons keywords={resourceToBeUpdated.keywords} />
                                    <li id='restrictions'>
                                        Restrictions
                                    </li>
                                    <RestrictionButtons restrictions={resourceToBeUpdated.restrictions} />
                                    <textarea
                                        id='description'
                                        defaultValue={resourceToBeUpdated.description}
                                    ></textarea>
                                    
                                    <div id='userButtonDiv'>
                                        <button
                                            id='updateButton'
                                            className='postButton'
                                            type='submit'
                                        >
                                            update
                                        </button>
                                        <button
                                            id='deleteButton'
                                            className='postButton'
                                            onClick={(e) => deleteResource(e)}
                                        >
                                            delete
                                        </button>
                                    </div>
                                </form>))}
            </section>
            <BackToTopButtons />
        </div>
    );
};
export default ResourceUpdate;

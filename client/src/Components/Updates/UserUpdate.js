// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import StatusButtons from '../Buttons/StatusButtons';

/* Functional component that returns a form that is populated with the information of the resource the user wishes to update. The user can make alterations to the data and submit the changes to the database. */
const UserUpdate = () => {
    // Declares some consts with some relevant url information.
    const path = window.location.href.split('/');
    const id = path[4];
    /* Declares a dummy object that matches the schema.  'restrictions', 'vote_count', and 'comments' will be added in future versions. */
    let userInfo = {
        'username': '',
        'email': '',
        'password': '',
        'status': '',
    };
    // Sets the 'state' of 5 consts.
    const [updateUser, setUpdateUser] = useState(false);
    const [userDelete, setUserDelete] = useState(false);
    const [resourceToBeUpdated, setResource] = useState(userInfo);
    const [error, setError] = useState('');
    const [requestError, setRequestError] = useState('');

    // Function that fetches the resource to be updated.
    const getUserInfo = () => {
        const token = window.localStorage.getItem('api_token');
        fetch('http://localhost:8000/users/' + id, {
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
                // If there is an 'message' sent back with the data, setError to the message. If not, setResource to 'data'.
                if (data.message) {
                    console.log('Error message -', data.message);
                    setError(data.message + ' Check your url.');
                    setRequestError('Request Error');
                } else {
                    setResource(data.user);
                }
            })
            // If there is an error, catch it and set 'error'.
            .catch(function (err) {
                console.log('get error', err);
                setError(err.message);
                setRequestError('Request Error');
            })
    }

    /* useEffect hook. When component mounts, calls function 'getUserInfo'. Empty array as second argument to avoid activating the effect hook whenever the component updates. */
    useEffect(() => {
        getUserInfo();
        document.getElementById('pageTop')
        .scrollIntoView({
            behavior: "instant"
        });
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
    }, []);

    /* Function that takes the data that the user modified and uses it to update the user. */
    const updateUserInfo = (e) => {
        // Prevents the form from submitting normally.
        e.preventDefault();
        // Declares a variable whose value is the form being used to update a resource. 
        let updateResource = document.forms.updateResource;

        /* Function that grabs all the elements with 'reactButton' in it's className, and pushes each elements value into the appropriate array that is a value in the 'userInfo' object. */
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
                    /* If the third index of 'key' exists and it equals 'clicked', push the value of the button into the appropriate array in 'userInfo'. */
                    key[2] && key[2] === 'clicked' ? userInfo['status'] = buttonArray[item].value : null;
                };
            };
        };
        getValues();
        // Grabs the value of the 'name' input and assigns it userInfo.name.
        userInfo.username = updateResource.username.value.trim();
        // Grabs the value of the 'email' input and assigns it userInfo.email.
        userInfo.email = updateResource.email.value.trim();
        // Grabs the value of the 'desciption' input and assigns it userInfo.desciption.
        if (updateResource.password.value.trim() !== '') {
            userInfo.password = updateResource.password.value.trim();
        } else {
            userInfo.password = resourceToBeUpdated.password;
        }
        // Function that posts the updated data to the database.
        const postUpdatedResource = () => {
            // // 'Fetch' request to a url that the server is listening at.
            const token = window.localStorage.getItem('api_token');
            fetch('http://localhost:8000/users/update/' + resourceToBeUpdated._id, {
                // Type of 'fetch' is a put.
                method: 'PUT',
                // Informs app that the type of data that will sent with 'fetch' will be a json object.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // Sets what will be the req.body for the server.
                body: JSON.stringify(userInfo),
            })
                .then(response => {
                    return response.json();
                })
                // On successful update, set 'updateUser' to true.
                .then((data) => {
                    if (data.updateMessage) {
                        setError(data.updateMessage);
                    } else {
                        setError('');
                        setUpdateUser(true);
                    }
                })
                // If there is an error, catch it and set 'error'.
                .catch(function (err) {
                    console.log('update err', err);
                    setError(err.message);
                    setRequestError('Request Error');
                })
        }
        // Calls the 'postUpdatedResource' function.
        postUpdatedResource();
    }
    // Function that deletes the user.
    const deleteUser = (e) => {
        e.preventDefault();
         // // 'Fetch' request to a url that the server is listening at.
         const token = window.localStorage.getItem('api_token');
         fetch('http://localhost:8000/users/delete/' + resourceToBeUpdated._id, {
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
                setUserDelete(true);
                console.log('user deleted.')
             })
             // If there is an error, catch it and set 'error'.
             .catch(function (err) {
                 setError(err);
             })
    }

    return (
        <>
            <div
                id='appHeader'
                className='zipcodeButtonDiv'
            >
                <h1
                    id='appH1'
                    className='searchH1'
                >
                    <span id='updateSpan'>{updateUser ? 'user successfully updated' : (userDelete ? 'user successfully deleted' : (requestError ? 'update user ' + requestError : 'update user'))}</span>
                    <div
                        id='navLinkDiv'
                    >
                        <Link
                            to={userDelete ? `/${'users'}`: `/${'users#' + id}`}
                            key={99}
                            className={'reactButton navLink'}
                        >
                            back to users
                        </Link>
                    </div>
                </h1>
            </div>
            <section id='pageBody' className='updateSection'>
                <h2 id='errorH2'>
                    {error && error}
                </h2>
                {/* If the value of 'updateUser' is 'true', then display a message to the user to inform them that their resource has been updated. Else display the form. */}
                {updateUser ?
                    null :
                    (userDelete ? null :
                         (requestError ? null :
                            <form
                                id='updateResource'
                                name='updateResource'
                                className='appForm'
                                onSubmit={(event) => updateUserInfo(event)}
                            >
                                <input
                                    id='username'
                                    name='username'
                                    defaultValue={resourceToBeUpdated.username}
                                />
                                <input
                                    id='email'
                                    name='email'
                                    defaultValue={resourceToBeUpdated.email}
                                />
                                <input
                                    id='password'
                                    name='password'
                                    placeholder='Type here to update password'
                                />
                                <li id='keywords'>
                                    Status
                                </li>
                                <StatusButtons status={resourceToBeUpdated.status} />
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
                                        onClick={(e) => deleteUser(e)}
                                    >
                                        delete
                                    </button>
                                </div>
                            </form>))}
            </section>
        </>
    );
};
export default UserUpdate;

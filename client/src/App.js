// Richie T-57866

// Import the necessary modules from react.
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
// Import the necessary components to set up the routes.
import Navbar from './Components/Navbar';
import MainPage from './Components/MainPage/MainPage';
import Error from './Components/Error';
import Searches from './Components/Search/Searches';
import ZipcodeSearch from './Components/Search/ZipcodeSearch';
import CountySearch from './Components/Search/CountySearch';
import NameSearch from './Components/Search/NameSearch';
import ResourceResults from './Components/Results/ResourceResults';
import CountyResults from './Components/Results/CountyResults';
import NameResults from './Components/Results/NameResults';
import Resources from './Components/Resources/Resources';
import UnauthorizedAccess from './Components/UnauthorizedAccess';
import ResourceForm from './Components/Forms/ResourceForm';
import ResourceUpdate from './Components/Updates/ResourceUpdate';
import CountyResourceUpdate from './Components/Updates/CountyResourceUpdate';
import NameResourceUpdate from './Components/Updates/NameResourceUpdate';
import DisplayResult from './Components/Results/DisplayResult';
import DisplayCountyResult from './Components/Results/DisplayCountyResult';
import DisplayNameResult from './Components/Results/DisplayNameResult';
import LandingPage from './Components/Forms/LandingPage';
import UserResults from './Components/Results/UserResults';
import UserUpdate from './Components/Updates/UserUpdate';
import UserForm from './Components/Forms/UserForm';
import FilterButtons from './Components/Buttons/FilterButtons';

const App = () => {
    /* Functional component that returns basic layout of the pages with the react 'Switch' component that will use whichever imported component is assigned to the url requested. John Levin helped with Switch/Route. */
    const webtoken = window.localStorage.getItem('api_token') || '';
    const [token, setToken] = useState(webtoken);
    const [userToken, setUserToken] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [filters, setFilters] = useState([]);
    /* Grabs the 'keywords' and 'restrictions' from localStorage to be used as a state variable for 'keywordFilters' and 'restrictionFilters' so that when the user refreshes the page, the filters chosen by the user continue to affect search results. If localStorage is empty of these values, set them as an empty array. */
    let keywordFilters = window.localStorage.getItem('keywords');
    let restrictionFilters = window.localStorage.getItem('restrictions');
    if (!keywordFilters) {
        keywordFilters = [];
        window.localStorage.setItem('keywords', []);
    } else {
        let filterArray = keywordFilters.split(',');
        keywordFilters = filterArray;
    }
    if (!restrictionFilters) {
        restrictionFilters = [];
        window.localStorage.setItem('restrictions', []);
    } else {
        let filterArray = restrictionFilters.split(',');
        restrictionFilters = filterArray;
    }
    const [keywords, setKeywords] = useState(keywordFilters);
    const [restrictions, setRestrictions] = useState(restrictionFilters);
    const [error, setError] = useState('');
    const [propBool, setPropBool] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedResource, setSelectedResource] = useState({});
    
    useEffect(() => {
        if (token) {
            fetch('http://localhost:8000/user/', {
                // Type of 'fetch' is a post.
                method: 'GET',
                // Informs app that the type of data that will sent with 'fetch' will be a json object.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                // Grabs the json object returned by the server and makes it available for next promise.
                .then((response) => {
                    return response.json();
                })
                // Uses values from the returned object for this promise.
                .then((data) => {
                    /* If data has a message property, set 'message' to the value of the message. If the length of the data is greater than zero, sort the data by the distance from the zip code provided by the user and set 'results' equal to the sorted data. */
                    setUserToken(token);
                    setUserStatus(data.user.status);
                    setLoading(false);
                })
                // If there is an error, catch it and set 'error'.
                .catch(function (err) {
                    setToken('');
                    localStorage.clear();
                    const errorMessage = document.getElementById('errorH1');
                    errorMessage.className = '';
                    setError('Unauthorized Token!!! You have been kicked out of the app for having an unauthorized JSON webtoken. Please Sign Up or Login again.');
                });

        }

    }, [])

    return (
        <div id='mainAppDiv'>
            <Navbar
                token={userToken}
                setToken={setToken}
                userStatus={userStatus}
                filters={filters} setFilters={setFilters}
                keywords={keywords}
                setKeywords={setKeywords}
                restrictions={restrictions}
                setRestrictions={setRestrictions}
                propBool={propBool}
                setPropBool={setPropBool}
            />
            <div
                id='pageDiv'
                className='landingPageDiv'
            >
                    <div id='filters' className='asideLeft'>
                        <FilterButtons
                            filters={filters} setFilters={setFilters}
                            keywords={keywords}
                            setKeywords={setKeywords}
                            restrictions={restrictions}
                            setRestrictions={setRestrictions}
                            propBool={propBool}
                            setPropBool={setPropBool}
                        />
                    </div>
                    {token ? 
                        (!loading ?
                            <Switch>
                                {/* Use render method for Component when passing props */}
                                <Route
                                    path='/search/zipcodes/:zipcode/:id/:distance/:resultNum' exact
                                    render={(props) => <DisplayResult userStatus={userStatus} 
                                    setPropBool={setPropBool}
                                    selectedResource={selectedResource}
                                    {...props} />}
                                />
                                <Route
                                    path='/search/zipcodes/:zipcode' exact
                                    render={(props) => <ResourceResults filters={filters} 
                                    keywords={keywords}
                                    setKeywords={setKeywords}
                                    restrictions={restrictions}
                                    propBool={propBool}
                                    setSelectedResource={setSelectedResource}
                                    {...props}/>}
                                />
                                <Route
                                    path='/search/zipcodes' exact
                                    component={ZipcodeSearch}
                                />
                                <Route
                                    path='/search/county/:county/:id/:resultNum' exact
                                    render={(props) => <DisplayCountyResult userStatus={userStatus} 
                                    setPropBool={setPropBool}
                                    selectedResource={selectedResource}
                                    {...props} />}
                                />
                                <Route
                                    path='/search/county/:county' exact
                                    render={(props) => <CountyResults filters={filters} 
                                    keywords={keywords}
                                    setKeywords={setKeywords}
                                    restrictions={restrictions}
                                    propBool={propBool}
                                    setSelectedResource={setSelectedResource}
                                    {...props}/>}
                                />
                                <Route
                                    path='/search/county' exact
                                    component={CountySearch}
                                />
                                <Route
                                    path='/search/name/:name/:id/:resultNum' exact
                                    render={(props) => <DisplayNameResult userStatus={userStatus} 
                                    setPropBool={setPropBool}
                                    selectedResource={selectedResource}
                                    {...props} />}
                                />
                                <Route
                                    path='/search/name/:name' exact
                                    render={(props) => <NameResults filters={filters} 
                                    keywords={keywords}
                                    setKeywords={setKeywords}
                                    restrictions={restrictions}
                                    propBool={propBool}
                                    setSelectedResource={setSelectedResource}
                                    {...props}/>}
                                />
                                <Route
                                    path='/search/name' exact
                                    component={NameSearch}
                                />
                                <Route
                                    path='/search' exact
                                    component={Searches}
                                />
                                <Route
                                    path='/resources/update/:id/:zipcode/:distance/:resultNum' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <ResourceUpdate /> :
                                                (userStatus === 'support' ?
                                                    <ResourceUpdate /> :
                                                    window.location.href = '/unauthorizedaccess'
                                                )
                                        )
                                    }}
                                />
                                <Route
                                    path='/resources/update/:id/:county/:resultNum' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <CountyResourceUpdate /> :
                                                (userStatus === 'support' ?
                                                    <CountyResourceUpdate /> :
                                                    window.location.href = '/unauthorizedaccess'
                                                )
                                        )
                                    }}
                                />
                                <Route
                                    path='/resources/nameUpdate/:id/:resultNum/:name' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <NameResourceUpdate /> :
                                                (userStatus === 'support' ?
                                                    <NameResourceUpdate /> :
                                                    window.location.href = '/unauthorizedaccess'
                                                )
                                        )
                                    }}
                                />
                                <Route
                                    path='/resources/enter' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <ResourceForm /> :
                                                (userStatus === 'support' ?
                                                    <ResourceForm /> :
                                                    window.location.href = '/unauthorizedaccess'
                                                )
                                        )
                                    }}
                                />
                                <Route
                                    path='/resources' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <Resources /> :
                                                (userStatus === 'support' ?
                                                    <Resources /> :
                                                    window.location.href = '/unauthorizedaccess'
                                                )
                                        )
                                    }}
                                />
                                <Route
                                    path='/users/enter' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <UserForm /> :
                                                window.location.href = '/unauthorizedaccess'
                                        )
                                    }}
                                />
                                <Route
                                    path='/users/:userid' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <UserUpdate /> :
                                                window.location.href = '/unauthorizedaccess'
                                        )
                                    }}
                                />
                                <Route
                                    path='/users' exact
                                    render={() => {
                                        return (
                                            userStatus === 'admin' ?
                                                <UserResults /> :
                                                window.location.href = '/unauthorizedaccess'
                                        )
                                    }}
                                />
                                <Route
                                    path='/unauthorizedaccess' exact
                                    component={UnauthorizedAccess}
                                />
                                <Route
                                    path='/' exact
                                    component={MainPage}
                                />
                                <Route
                                    path='*'
                                    component={Error} 
                                /> 
                            </Switch> : null) : <LandingPage setError={setError} setToken={setToken} />}
                </div>
            <h1 id='errorH1' className='noShow'>{error && error}</h1>
        </div>
    )
}

export default App;
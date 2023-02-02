// Richie T-57866

// Import the necessary modules from react.
import React, { useEffect } from 'react';
import BackToTopButtons from '../Buttons/BackToTopButtons';
import './MainPage.css';

const Home = () => {
    /* useEffect hook. When component mounts, closes 'filters' and adjusts for scrollbar. */
    useEffect(() => {
        const list = document.getElementById('filters');
        list.className = 'asideLeft';
        let mainAppDiv = document.getElementById('mainAppDiv');
        if (mainAppDiv) {
            mainAppDiv.classList.remove('marginRightAdjustment');
        }
    }, []);
    return (
        <div id="altPageBody">
            <div id='resultsTop'></div>
            <h2 className='welcomeH2'>Welcome to the ParoleHub!</h2>
            <p id='mainP'>Rehabilitation Resources for California</p>
            <p className='mainContent'>
                Most of the reentry resources that incarcerated people need to change themselves for the better and establish a viable set of parole plans exist on the other side of these walls. What we do have comes in the form of mailing letters, specific programs bringing them in, or relying other incarcerated people for assitance.
            </p>
            <p className='mainContent'>
                Mail is slow. COVID quarantines, in addition to lockdowns for whatever reason, let us all know that normal programming is not certain. And sadly, incarcerated people segregate themselves for a variety of reasons. There is no centralization of resources that incarcerated people can depend on for what is so desperately needed.
            </p>
            <p className='mainContent'>
                This app is designed to give incarcerated people assitance to plan for his/her/their potential release from California prisons. With the introduction of new technologies to all incarcerated people in California, it is my dream to give us all what we need to plan for our future by getting this app on those technologies.
            </p>
            <p className='mainContent'>
                Right now ParoleHub allows the user to enter a Zip Code into the searchbar and the app will return all the resources in the database that are within a 45 mile radius of the Zip Code. I chose 45 miles because roads are almost never straight and I wanted to make sure the user did not go outside of the 50 mile parole limit to get to a resource. :)
            </p>
            <p className='mainContent'>
                The user can also request a resource to be entered, and request a resource be updated.
                <li> --- Note --- The request protocols are not yet set in place. For now, the Admin and Support users can enter and update resources. Be responsible.</li>
            </p>
            <p className='mainContent'>
                One of the keywords for the resources in this app is <span className='importantText'>"STOP Program."</span> STOP Program stands for Specialized Treatment for Optimized Programming. STOP Programs provide the following:
                <li> - Substance Use Disorder Treatment</li>
                <li> - Detoxification Services</li>
                <li> - Assistance with Enrollment to Health Care Services</li>
                <li> - General Health Education Services</li>
                <li> - Motivational Incentives</li>
                <li> - Anger Management</li>
                <li> - Criminal Thinking</li>
                <li> - Life Skills Programs</li>
                <li> - Community and Family Reunification Services</li>
                <li> - Employment and Educational Services, and Referrals</li>
                <li> - Individual, Family, and Group Counseling</li>
                <li> - Faith Based Services</li>
                <li> - Recovery and Reentry Housing</li>
                <li> - Emergency Housing Services</li>
            </p>
            <p className='mainContent'>
                Although the app only has this search by Zip Code capability, eventually it will be upgraded to include features like:
                <li> - Postings for new resources</li>
                <li> - Postings for changes in the law and up-to-date forms to file with</li>
                <li> - Recommended readings/programs for individual case factors</li>
                <li> - Ratings and comments for lawyers on the parole circuit</li>
                and more.
            </p>
            <p className='mainContent'>
                <li className='importantText'>
                    ParoleHub has been upgraded and can now do the following:
                </li>
                <li>- Filter Search Results so that the user only receives results based on any of the Keywords the user selected and all of the Restrictions selected by the user.</li>
                <li> - Search by County</li>
                <li> - Search by the Name of the Resource</li>
            </p>
            <p className='mainContent'>
                I hope this app gives you what you need to get your life in order.
            </p>
            <div className='bottomSpacerDiv'></div>
            <div id='hideThisOnBigScreens'>
                <BackToTopButtons />
            </div>
        </div>
    )
}

export default Home;
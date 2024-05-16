import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../GeneralComponents/ContextApi'

export const TutorsDashBoard = () => {
    // Getting my grap
    const { TutorDashboardGraph } = useContext(AppContext);
    const { TutorDetails, setTutorDetails } = useContext(AppContext)

    // Retrieve TutorDetails from local storage on component mount
    useEffect(() => {
        // when getting from the local storage, always put it in a variable -Sir kingdom
        const storedTutorDetails = localStorage.getItem('TutorDetails :');
        if (storedTutorDetails) {
            setTutorDetails(JSON.parse(storedTutorDetails));
        }
    }, [setTutorDetails]);


    //   Function to convert the first letter to uppercase
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <>
            <div className={"Tutor-Dashboard-Banner"}>
                <section className={"profilePic-containier"}>
                    <div className={"TutorProfilePic-wrapper"}>
                        <img src={"PublicImages/UnknownAvatarImage.png"} alt="ProfilePic" />
                    </div>
                </section>
                <div className="TutorDashBoardBannerWelcomeLineContainer">
                    <h1>Welcome {capitalizeFirstLetter(TutorDetails.firstname)},</h1>

                    <span>Level: <span className={"Tutor-DashBoard-Stat-Value"}> 0</span></span>
                </div>
                <div className={"TutorDashBoard-stats"}>
                    <span>Experience Level: <span className={"Tutor-DashBoard-Stat-Value"}>{capitalizeFirstLetter(TutorDetails.experiencelevel)}</span></span>

                    <span>Total Lessons: <span className={"Tutor-DashBoard-Stat-Value"}> 0</span> </span>

                    <span>Total Students: <span className={"Tutor-DashBoard-Stat-Value"}> 0</span></span>
                </div>

            </div>
            <br />
            <h1 className={"Tutor-CourseCompletion-header"}>Courses Statistics</h1>
            {/* npm install recharts  to install Charts*/}

            <div className={"Tutor-DashBoardGraph-Container"}>

                {TutorDashboardGraph}

            </div>


        </>
    )
}


export const TutorsCourses = () => {

    return (
        <>
            <h1>Tutors Courses</h1>
        </>
    )
}


export const TutorsCreateCourse = () => {

    return (
        <>
            <h1>Tutors Create Courses</h1>
        </>
    )
}

export const TutorsInbox = () => {

    return (
        <>
            <h1>Tutors Inbox</h1>
        </>
    )
}


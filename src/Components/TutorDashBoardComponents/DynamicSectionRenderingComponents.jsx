import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../GeneralComponents/ContextApi';
import CreateCourseIcon from "../../SrcImages/AddButton-blue-Image.png";
import toast, { Toaster } from "react-hot-toast";
import Cancel from "../../SrcImages/cancel.png";
import ButtonLoader from "../../Loader/ButtonLoader";

export const TutorsDashBoard = () => {
    const { TutorDashboardGraph } = useContext(AppContext);
    const { TutorDetails, setTutorDetails } = useContext(AppContext);

    useEffect(() => {
        const storedTutorDetails = localStorage.getItem('TutorDetails :');
        if (storedTutorDetails) {
            setTutorDetails(JSON.parse(storedTutorDetails));
        }
    }, [setTutorDetails]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <>
            <div className="Tutor-Dashboard-Banner">
                <section className="profilePic-containier">
                    <div className="TutorProfilePic-wrapper">
                        <img src="PublicImages/UnknownAvatarImage.png" alt="ProfilePic" />
                    </div>
                </section>
                <div className="TutorDashBoardBannerWelcomeLineContainer">
                    <h1>Welcome {capitalizeFirstLetter(TutorDetails.firstname)},</h1>
                    <span>Level: <span className="Tutor-DashBoard-Stat-Value"> 0</span></span>
                </div>
                <div className="TutorDashBoard-stats">
                    <span>Experience Level: <span className="Tutor-DashBoard-Stat-Value">{capitalizeFirstLetter(TutorDetails.experiencelevel)}</span></span>
                    <span>Total Lessons: <span className="Tutor-DashBoard-Stat-Value"> 0</span> </span>
                    <span>Total Students: <span className="Tutor-DashBoard-Stat-Value"> 0</span></span>
                </div>
            </div>
            <br />
            <h1 className="Tutor-CourseCompletion-header">Courses Statistics</h1>
            <div className="Tutor-DashBoardGraph-Container">
                {TutorDashboardGraph}
            </div>
        </>
    );
};



// Course Card Props

const CourseCard = ({ course }) => {
    const { TutorDetails } = useContext(AppContext);
  
    return (
      <div className="course-card">
        <div className="course-card-bg"></div>
        <h2 className="course-card-title">{course.courseTitle}</h2>
        <p className="course-card-subtitle">{course.courseDescription}</p>
        <p className="course-card-author">Created by {`${TutorDetails.lastname} ${TutorDetails.firstname}`}</p>
      </div>
    );
  };
  
  export const TutorsCourses = () => {
    const { TutorDetails } = useContext(AppContext);
  
    return (
      <div className="tutors-courses-container">
        <h1 className="tutors-courses-title">Tutors Courses</h1>
        <div className="tutors-courses-flex">
          {TutorDetails.courses && TutorDetails.courses.length > 0 ? (
            TutorDetails.courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </div>
    );
  };
  












export const TutorsCreateCourse = () => {
    const { TutorDetails, setTutorDetails,Tutorusers, setTutorUsers} = useContext(AppContext);

    const createCourseButton = useRef(null);
    const CourseCreationDialog = useRef(null);
    const validatorMessage = useRef(null);
    const makeCourseButton = useRef(null);

    const [TutorCourse, setTutorcourse] = useState({
        courseTitle: "",
        courseDescription: "",
    });
    const [submitClick, setSubmitClick] = useState(false);

    // Function to handle the input value change
    const handleInputValueChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setTutorcourse({ ...TutorCourse, [name]: value });
    };

    // Function to validate the input value
    const CourseDetailsValidator = () => {
        const { courseTitle, courseDescription } = TutorCourse;
        if (courseTitle.trim().length > 0 && courseDescription.trim().length > 0) {
            return true;
        } else {
            validatorMessage.current.textContent = "All fields are required";
            return false;
        }
    };

    // Function to handle submission process
    const SubmitCourseDetailsProcess = (event) => {
        event.preventDefault();

        if (CourseDetailsValidator()) {
            validatorMessage.current.textContent = "";
            setSubmitClick(true); // Set submitClick to true

            setTimeout(() => {
                const updatedCourses = [...(TutorDetails.courses || []), TutorCourse];
                const updatedTutorDetails = { ...TutorDetails, courses: updatedCourses };
                setTutorDetails(updatedTutorDetails);
                localStorage.setItem('TutorDetails :', JSON.stringify(updatedTutorDetails));

                // Update Tutorusers array
                const updatedTutorUsers = Tutorusers.map((tutor) =>
                    tutor.email === TutorDetails.email ? { ...tutor, courses: updatedCourses } : tutor
                );

                // Update the context and local storage for Tutorusers
                setTutorUsers(updatedTutorUsers);
                localStorage.setItem('TutorUsers', JSON.stringify(updatedTutorUsers));

                setSubmitClick(false); // Reset submitClick after processing
              setTimeout(()=>{
                CourseCreationDialog.current.close();

                toast.success("Course created Successfully", {
                    style: {
                        background: "rgb(144, 234, 96)",
                    },
                });
              },1000)
            }, 2000);
        } else {
            setSubmitClick(false); // Reset submitClick immediately if validation fails
        }
    };

    // Function to show the dialog the user uses to create a new Course
    const revealCourseCreationDialog = () => {
        CourseCreationDialog.current.showModal();
    };

    // Function to close the dialog the user uses to create a new course
    const CloseCourseCreationDialog = () => {
        CourseCreationDialog.current.close();
    };

    return (
        <>
            <h1>Tutors Create Courses</h1>
            <section className="Create-course-section">
                <div onClick={revealCourseCreationDialog} className="Create-course-Button">
                    <img ref={createCourseButton} src={CreateCourseIcon} alt="Pic" />
                </div>

                <dialog ref={CourseCreationDialog} className="CourseCreationDialog">
                    <div onClick={CloseCourseCreationDialog} className="CloseCourseCreationDialog">
                        <img src={Cancel} alt="cancel" />
                    </div>

                    <h1>What will this course be about?</h1>
                    <form onSubmit={SubmitCourseDetailsProcess}>
                        <label>
                            Course Title:
                            <input onChange={handleInputValueChange} name="courseTitle" value={TutorCourse.courseTitle} type="text" />
                        </label>
                        <br />
                        <label>
                            Course Description:
                            <textarea onChange={handleInputValueChange} name="courseDescription" value={TutorCourse.courseDescription}></textarea>
                        </label>
                        <div style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center" }} ref={validatorMessage}></div>
                        <br />
                        <div className="CourseCreationButtonContainer">
                            <button ref={makeCourseButton} disabled={submitClick} type="submit">
                                {submitClick ? <ButtonLoader /> : "Create"}
                            </button>
                        </div>
                    </form>
                </dialog>
                <Toaster position="top-center" reverseOrder={false} />
            </section>
        </>
    );
};














export const TutorsInbox = () => {
    return (
        <>
            <h1>Tutors Inbox</h1>

        </>
    );
};

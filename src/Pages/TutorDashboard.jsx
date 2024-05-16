import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Components/TutorDashBoardComponents/SideBar";
import {
  TutorsCourses,
  TutorsCreateCourse,
  TutorsDashBoard,
  TutorsInbox,
} from "../Components/TutorDashBoardComponents/DynamicSectionRenderingComponents";
import { AppContext } from "../GeneralComponents/ContextApi";

const TutorDashboard = () => {
  const {
    TutorDashBoardIconClick,
    setTutorDashBoardIconClick,
    TutorCoursesIconClick,
    setTutorCoursesIconClick,
    TutorCreateCourseIconClick,
    setTutorCreateCourseIconClick,
    TutorNotificationIconClick,
    setTutorNotificationIconClick,
  } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>Tutor Dashboard</title>
      </Helmet>

      <h1>Tutor's Dashboard NavBar</h1>

      <div className={"TutorDashBoard-Main-section"}>
        <SideBar />

        {/* CONTAINER FOR DYNAMIC RENDERING OF SECTIONS */}

        <div className={"Tutor-Dynamic-sections-container"}>
          {TutorDashBoardIconClick && <TutorsDashBoard />}
          {TutorCoursesIconClick && <TutorsCourses />}
          {TutorCreateCourseIconClick && <TutorsCreateCourse />}
          {TutorNotificationIconClick && <TutorsInbox />}
          {/* i used the && logical operator to conditionally render each component.
          If the state value is true, the corresponding component will be rendered.
          If the state value is false, the component won't be rendered. */}
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;

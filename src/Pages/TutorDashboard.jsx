import React from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Components/TutorDashBoardComponents/SideBar";

const TutorDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Tutor Dashboard</title>
      </Helmet>

      <h1>Tutor's Dashboard  NavBar</h1>

      <div className={"TutorDashBoard-Main-section"}>
        <SideBar/>

        {/* CONTAINER FOR DYNAMIC RENDERING OF SECTIONS */}

        <div className={"Tutor-Dynamic-sections-container"}>

        </div>

      </div>


    </>
  );
};

export default TutorDashboard;

//   Use contetnt is a react hook or tool that helps us to manage state globally, and access context in react from anywhere
// First of all, you have to import React, and createContext from"react" as shown below
// It is also used as an environmental variable... basiclally a global variable, for all components
import React, { createContext, useState } from "react";
// import propTypes from "prop-types"

// This is a global variable set as a context api
export const AppContext = createContext("here");

export const AppcontextProvider = (props) => {
    const { children } = props; //Destructure children from props

    // Here i am destructing the form details from the student sign in form, so it can be accessble for later
    const [studentDetails, setStudentDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        experiencelevel: "",
        password: "",
    });

    // Here i am destructuring the form details from the tutor sign in form, so it can be accessble for later
    const [TutorDetails, setTutorDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        experiencelevel: "",
        password: "",
      });



    //   Here, is where i place the variables i want to make accessible to all components in my Project
    const contextValue = {
        studentDetails, setStudentDetails, TutorDetails, setTutorDetails

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// AppcontextProvider.propTypes = {
//     children: propTypes.node.isRequired //Validating children PROPS
// }

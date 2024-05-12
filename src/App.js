import React, { Suspense } from "react"
import "./CSS/styles.css"
import "./CSS/PageLoader.css"
import "./CSS/ButonLoader.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./GeneralComponents/Footer";
import Loader from "./Loader/Loader.jsx"
import TutorSignUpFormPage from "./Pages/TutorSignUpFormPage.jsx";

// Lazy imports
const HomePage = React.lazy(() => import("./Pages/HomePage"))
const StudentDashboard = React.lazy(()=> import("./Pages/StudentDashboard"))
const TutorDashboard = React.lazy(()=> import("./Pages/TutorDashboard"))
const SignUpQuestionPage = React.lazy(() => import("./Pages/SignUpQuestionPage"))
const StudentSignUpFormPage = React.lazy(()=> import("./Pages/StudentSignUpFormPage"))

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>

          <Routes>
            <Route path="/studentDashboard" element={<StudentDashboard />} />
            <Route path="/tutorDashboard" element={<TutorDashboard />} />
            <Route path="/signupQuestionPage" element={<SignUpQuestionPage />} />
            <Route path="/studentSignUpFormPage" element={<StudentSignUpFormPage />} />
            <Route path="/tutorSignUpFormPage" element={<TutorSignUpFormPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        <Footer />
        </Suspense>
      </Router>
    </>
  );
}

export default App;

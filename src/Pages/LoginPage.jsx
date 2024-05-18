import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AppContext } from "../GeneralComponents/ContextApi";
import ButtonLoader from "../Loader/ButtonLoader";

const LoginPage = () => {
    const {
        TutorDetails, setTutorDetails,
        Tutorusers, setTutorUsers,
        LoginDetails, setLoginDetails
    } = useContext(AppContext);

    const [submitClick, setSubmitClick] = useState(false);
    const navigate = useNavigate();

    //  This function handles Input Value change in the email field, and the roles field 
    const handleInputValueChange = (e) => {
        // destructuring the name and value fields for updating the login details state
        const { name, value } = e.target;
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };
    //   Function to handle chaneg of password on the input field, to update the password field in the Login Details state.
    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            password: value
        }));
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        setSubmitClick(true);

        // Destructuring login details
        setTimeout(() => {
            const { email, password, role } = LoginDetails;

            if (role === "Tutor") {
                // Find the tutor with matching email and password
                const existingTutor = Tutorusers.find(user => user.email === email && user.password === password);

                if (existingTutor) {
                    toast.success("Logged in successfully", {
                        style: {
                            background: "rgb(140, 240, 156)",
                        },
                    });
                    // Saving the Tutor Details in the local storage,
                    setTutorDetails(existingTutor);
                    localStorage.setItem("TutorDetails :", JSON.stringify(existingTutor));

                    // I set this setTimeout so that The user can see the message of successful Login. before the user is navigated to the DashBoard.
                    setTimeout(() => {
                        navigate("/TutorDashboard"); // Redirect to tutor dashboard or any other page
                    }, 3000)

                } else {
                    toast.error("Email or password is incorrect", {
                        style: {
                            background: "rgb(240, 139, 156)",
                        },
                    });
                }
            } else {
                toast.error("Only tutors can log in", {
                    style: {
                        background: "rgb(240, 139, 156)",
                    },
                });
            }

            setSubmitClick(false);
        }, 3000)
    };

    return (
        <>
            <Helmet>
                <title>FirstCode | Log In</title>
            </Helmet>
            <section className="StudentSignUpformSection">
                <div className={"StudentSignUpForm-image-container"}>
                    <div className={"TutorSignUpForm-image"}></div>
                </div>

                <div className={"StudentSignUpForm-Container"}>
                    <div className={"Form-LogoContainer"}>
                        <div className="Formlogo">
                            <svg
                                width={43}
                                height={43}
                                fill="none"
                                stroke="#1d3fed"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7.5 17.25 1.5 12 6 6.75" />
                                <path d="m16.5 17.25 6-5.25-6-5.25" />
                                <path d="m14.25 4.5-4.5 15" />
                            </svg>

                            <h2>First Code</h2>
                        </div>
                    </div>

                    <h1 style={{ color: "rgb(255, 153, 0)", fontSize: "30px" }}>Log In</h1>

                    {/* LOG IN FORM */}
                    <form onSubmit={handleSubmitClick}>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={LoginDetails.email}
                                onChange={handleInputValueChange}
                            />
                        </label>
                        <br />

                        <label>
                            Role:
                            <select
                                name="role"
                                value={LoginDetails.role}
                                onChange={handleInputValueChange}
                            >
                                <option value="">--Please choose an option--</option>
                                <option value="Tutor">Tutor</option>
                                <option value="Student">Student</option>
                            </select>
                        </label>
                        <br />

                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={LoginDetails.password}
                                onChange={handlePasswordChange}
                            />
                        </label>

                        <div className={"sign-upButtonContainer"}>
                            <button
                                type="submit"
                                disabled={submitClick}
                            >
                                {submitClick ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Adding the toaster styling here */}
                <Toaster position="top-center" reverseOrder={false} />
            </section>
        </>
    );
};

export default LoginPage;

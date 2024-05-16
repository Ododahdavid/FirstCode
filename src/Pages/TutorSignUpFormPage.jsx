import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoader from "../Loader/ButtonLoader";
import { Helmet } from "react-helmet";
import { AppContext } from "../GeneralComponents/ContextApi";

const TutorSignUpFormPage = () => {
  // i want to make the details from this tutor form available to all components, so i will be moving the below commented code, to the context API page. and i will destructure it here

  // const [TutorDetails, setTutorDetails] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   experiencelevel: "",
  //   password: "",
  // });

  // Destructuring the tutors form state from the context API page
  const { TutorDetails, setTutorDetails, Tutorusers, setTutorUsers } = useContext(AppContext);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [SubmitClick, setSubmitClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        navigate("/tutordashboard");
      }, 3000);
    }
  }, [formSubmitted, navigate]);

  const handleInputValueChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTutorDetails({ ...TutorDetails, [name]: value });
  };

  const handleSubmitClick = (event) => {
    setSubmitClick(true);
    event.preventDefault();
    TutorFormSubmitProcess(event);
    TutorSignUpFormButton.current.disabled = true;
  };

  const experienceLevelCheck = () => {
    
    const { experiencelevel } = TutorDetails;
    if (experiencelevel === "beginner") {
      toast.error("Beginner Can't be a Tutor", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    }
    else{
      return true;
    }
  };


    // submit process
  const TutorFormSubmitProcess = (event) => {
    event.preventDefault();
 

    if (
      TutorDetailsValidation() &&
      TutorNameValidation() &&
      TutorEmailValidation() &&
      PasswordStrengthValidator() &&
      experienceLevelCheck()
    ) {
      setTimeout(() => {
        setSubmitClick(false);
        toast.success("Form Submitted Successfully", {
          style: {
            background: "rgb(144, 234, 96)",
          },
        });
        
       
        // Pushing User details to Tutorusers Array as an object, to make an array of objects
        setTutorUsers([...Tutorusers, TutorDetails])
        // Store TutorDetails in local storage, so i can fetch it for dashboard display
        localStorage.setItem("TutorDetails :", JSON.stringify(TutorDetails));        
        setFormSubmitted(true);
        setPasswordStrength("");
        console.table(TutorDetails);
       
      }, 2000);
    } else if (!PasswordStrengthValidator()) {
      // toast styling
      toast.error("Password is too weak", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      setTimeout(() => {
        // Use setTimeout to ensure it's executed after the timeout
        setSubmitClick(false); // Re-enable the button
        TutorSignUpFormButton.current.disabled = false; // Re-enable the button
      }, 1000);
    }

    else {
      setTimeout(() => {
        setSubmitClick(false);
      }, 2000);
    }
    TutorSignUpFormButton.current.disabled = false;
  };

  // Reference for form submit button
  const TutorSignUpFormButton = useRef(null);

  // Validation functions
  const TutorDetailsValidation = () => {
    const { firstname, lastname, email, experiencelevel, password } =
      TutorDetails;

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      experiencelevel === "" ||
      password === ""
    ) {
      toast.error("Please fill all the fields", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  const TutorNameValidation = () => {
    const { firstname, lastname } = TutorDetails;
    const stringOnlyRegex = /^[A-Za-z\s]+$/;

    if (!stringOnlyRegex.test(firstname) || !stringOnlyRegex.test(lastname)) {
      toast.error("Please Enter a Valid Name", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  const TutorEmailValidation = () => {
    const { email } = TutorDetails;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please Enter a Valid Email", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  const [passwordStrength, setPasswordStrength] = useState("");

  const PasswordStrengthValidator = () => {
    const { password } = TutorDetails;

    if (password.trim().length <= 3) {
      setPasswordStrength("Too Weak");
      return false;
    } else if (password.trim().length > 3 && password.trim().length <= 6) {
      setPasswordStrength("Weak");
      return false;
    } else if (password.trim().length > 6 && password.trim().length <= 8) {
      setPasswordStrength("Good");
      return true;
    } else if (password.trim().length > 8) {
      setPasswordStrength("Strong");
      return true;
    }
  };

  const handlePasswordChange = (event) => {
    handleInputValueChange(event);
    PasswordStrengthValidator(event);
  };

  return (
    <>
      <Helmet>
        <title>FirstCode | Tutor Sign Up Form</title>
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

          <h1>
            Sign Up as a <span className={"OrangeKeyword"}>Tutor</span>
          </h1>

          {/* STUDENT SIGN UP FORM */}
          <form onSubmit={TutorFormSubmitProcess}>
            <label>
              First Name:
              <input
                type="text"
                name={"firstname"}
                value={TutorDetails.firstname}
                onChange={handleInputValueChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name={"lastname"}
                value={TutorDetails.lastname}
                onChange={handleInputValueChange}
              />
            </label>
            <br />
            <label>
              E-mail:
              <input
                type="email"
                name={"email"}
                value={TutorDetails.email}
                onChange={handleInputValueChange}
              />
            </label>
            <br />

            <label>
              Experience Level:
              <select
                name={"experiencelevel"}
                value={TutorDetails.experiencelevel}
                onChange={handleInputValueChange}
              >
                <option value="">--Please choose an option--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="master">Master</option>
              </select>
            </label>
            <br />

            <label>
              Password:
              <input
                type="password"
                name={"password"}
                value={TutorDetails.password}
                onChange={handlePasswordChange}
              />
              <div className={"passwordStrengthContainer"}>
                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Too Weak" ||
                      passwordStrength === "Weak" ||
                      passwordStrength === "Good" ||
                      passwordStrength === "Strong"
                        ? "red"
                        : "transparent",
                  }}
                ></div>

                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Weak" ||
                      passwordStrength === "Good" ||
                      passwordStrength === "Strong"
                        ? "red"
                        : "transparent",
                  }}
                ></div>

                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Good" ||
                      passwordStrength === "Strong"
                        ? "orange"
                        : "transparent",
                  }}
                ></div>

                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Strong" ? "green" : "transparent",
                  }}
                ></div>
              </div>
              <p className={"passwordStrengthAlert"}>
                Your password is <span>{passwordStrength}</span>
              </p>
            </label>

            <div className={"sign-upButtonContainer"}>
              <button
                ref={TutorSignUpFormButton}
                type="submit"
                onClick={handleSubmitClick}
                disabled={SubmitClick}
              >
                {SubmitClick ? <ButtonLoader /> : "Submit"}
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

export default TutorSignUpFormPage;

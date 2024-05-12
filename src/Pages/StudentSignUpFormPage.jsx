import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// importing toast, and toaster from react hot toast, to display status messages
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from "../Loader/ButtonLoader";

const StudentSignUpFormPage = () => {
  const [studentDetails, setStudentDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    experiencelevel: "",
    password: ""
  });

// Here i am destructing a variable formSubmitted, to know when the form has been submitted, for the purpose of navigation... if the form has been succesfully submitted, the user should be navigated tothe student dashboard
  const [formSubmitted, setFormSubmitted] = useState(false);

//   using ReactHook useNavigate
  const navigate = useNavigate();

//   This useEffect hook is watching to know if the form has been submitted, so it can navigate the user to the student dashboard
  useEffect(() => {
    if (formSubmitted) {
      setTimeout(()=>{
        navigate("/studentDashboard");
      }, 3000)
    }
  }, [formSubmitted, navigate]);

  // Function to handle Input value Change
  const handleInputValueChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  // Validation functions
  const studentDetailsValidation = () => {
    // deconstructing the student details for validation
    const { firstname, lastname, email, experiencelevel, password } =
      studentDetails;

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      experiencelevel === "" ||
      password === ""
    ) {
      // example of toast message, for errors i use toast.error
      toast.error("Please fill all the fields");
      return false;
    } else {
      return true;
    }
  };

  const studentNameValidation = () => {
    // deconstructing the student details for validation
    const { firstname, lastname } = studentDetails;
    const stringOnlyRegex = /^[A-Za-z\s]+$/;

    if (!stringOnlyRegex.test(firstname) || !stringOnlyRegex.test(lastname)) {
      toast.error("Please Enter a Valid Name");
      return false;
    } else {
      return true;
    }
  };

  const studentEmailValidation = () => {
    // deconstructing the student details for validation
    const { email } = studentDetails;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please Enter a Valid Email");
      return false;
    } else {
      return true;
    }
  };

  // Function to Validate Password strength
  const [passwordStrength, setPasswordStrength] = useState("");

  const PasswordStrengthValidator = () => {
    
    const { password } = studentDetails;

    if (password.trim().length <= 3) {
      setPasswordStrength("Too Weak");
      return false;
    } else if (password.trim().length > 3 && password.trim().length <= 6) {
      setPasswordStrength("Weak");
      return false;
    } else if (password.trim().length > 6 && password.trim().length <= 8) {
      setPasswordStrength("Good");
      return true
    } else if (password.trim().length > 8) {
      setPasswordStrength("Strong");
      return true
    }
  };

  // Function to handle password input value change
  const handlePasswordChange = (event) => {
    handleInputValueChange(event);
    PasswordStrengthValidator(event);
  };

  // function to handle submission process
  const studentFormSubmitProcess = async (event) => {
    event.preventDefault();

 

    if (
      studentDetailsValidation() &&
      studentNameValidation() &&
      studentEmailValidation()&&
      PasswordStrengthValidator()
      
    ) {
      setTimeout(()=>{
        setSubmitClick(false);
        toast.success("Form Submitted Successfully");
        setStudentDetails({
          firstname: "",
          lastname: "",
          email: "",
          experiencelevel: "",
          password: "",
        });
        setFormSubmitted(true);
        setPasswordStrength("");
        console.table(studentDetails);
        return true;
      }, 2000)
      
      setSubmitClick(true);
      
    } else if (!PasswordStrengthValidator()){
      toast.error("Password is too weak")
      setSubmitClick(false);

     }
    
    else {
      // toast.error("Invalid Inputs");
      setTimeout(()=>{
        setSubmitClick(false);
        return false;
      }, 2000)
    }

  
    
  };

  // I did this to add my Button loader when the button is clicked, SubmitClick is then set to true
  const [SubmitClick, setSubmitClick] = useState(false);

  const handleSubmitClick = (event) => {
    event.preventDefault();
    setSubmitClick(true);
    studentFormSubmitProcess(event);
  };






  return (
    <>
      <section className="StudentSignUpformSection">
        <div className={"StudentSignUpForm-image-container"}>
          <div className={"StudentSignUpForm-image"}></div>
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
            Sign Up as a <span className={"OrangeKeyword"}>Student</span>
          </h1>

          {/* STUDENT SIGN UP FORM */}
          <form onSubmit={studentFormSubmitProcess}>
            <label>
              First Name:
              <input
                type="text"
                name={"firstname"}
                value={studentDetails.firstname}
                onChange={handleInputValueChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name={"lastname"}
                value={studentDetails.lastname}
                onChange={handleInputValueChange}
              />
            </label>
            <br />
            <label>
              E-mail:
              <input
                type="email"
                name={"email"}
                value={studentDetails.email}
                onChange={handleInputValueChange}
              />
            </label>
            <br />

            <label>
              Experience Level:
              <select
                name={"experiencelevel"}
                value={studentDetails.experiencelevel}
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
                value={studentDetails.password}
                onChange={handlePasswordChange}
              />
              <div className={"passwordStrengthContainer"}>
                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      //   passwordStrength === "Too Weak" ? "red" : "transparent",
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
              <button type="submit" onClick={handleSubmitClick}>
                {
                  SubmitClick
                   ? <ButtonLoader/>
                    : "Submit"
                }
              </button>
            </div>
          </form>
        </div>

        {/* Adding the toaster styling here */}
        <Toaster   position="top-center" reverseOrder={false} />

        
      </section>
    </>
  );
};

export default StudentSignUpFormPage;

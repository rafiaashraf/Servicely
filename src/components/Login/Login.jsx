import React, { useState } from "react";
import "./Login.css";
import ReactDOM from "react-dom";
import carpenter from '../../characters/carpenter.png'
import cleaner1 from '../../characters/cleaner1.jpg'
import cleaner2 from '../../characters/cleaner2.jpg'
import electrician from '../../characters/electrician.png'
import taylor from '../../characters/taylor.jpg'
import { CSSTransition } from 'react-transition-group'
import { Cities, Dropdown, Experience } from "./Dropdown";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../state/userSlice";
import InputField from "./InputField";

let userData;

function Login() {

    // React States
    const [signUpError, setSignUpError] = useState(null)
    const [page, setPage] = useState(false);
    const [alert, setAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [SignIn, setSignIn] = useState(true);
    const [isWorker, setIsWorker] = useState(false);

    // REDUX
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    // ERRORS IN CASE WRONG INPUT
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleChange = () => {
        setSignIn(!SignIn);
        setPage(false);
        setSignUpError(null);
    }


    const handleWorker = () => {
        if (isWorker) {
            setPage(true)
        }
        setIsWorker(!isWorker);
    }

    // ----------------------------------------------
    // GET USER DATA FROM DATABASE
    const Login = async (url, uname, pass, table) => {
        const Data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ //parameters to be passed
                name: uname,
                pass: pass,
                table: table
            })
        })
            .then(res => res.json())
            .then(Data => {
                userData = Data[0]
            });
    }

    // CREATE CUSTOMER FUNCTION HERE
    const createcustomer = async (url, uname, pass, firstname, lastname, dob, gender, phone, cnic, email, street, house, city) => {
        const Data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ //parameters to be passed
                name: uname,
                password: pass,
                firstname: firstname,
                lastname: lastname,
                dob: dob,
                gender: gender,
                phone: phone,
                cnic: cnic,
                email: email,
                street: street,
                house: house,
                city: city
            })
        })
            .then(res => res.json())
            .then(Data => {
                if (Data[0].status == 'success') {
                    setSuccessAlert(true)
                    setTimeout(() => {
                        setSuccessAlert(false);
                    }, 3000)
                    setSignIn(true)
                    setSignUpError(null)
                }
                else {
                    if (Data[0].status == 'price') {
                        setSignUpError('Price Should Be Between $5 and $25');
                    }
                    else if (Data.status == 'age')
                        setSignUpError('Age Must Be Above 18 Years');
                    else {
                        Data[0].status = Data[0].status.toUpperCase()
                        setSignUpError(`${Data[0].status} Already Exists`);
                    }
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false);
                    }, 3000)
                }
            });

    }
    // CREATE WORER FUNCTION HERE
    const createworker = async (url, uname, pass, firstname, lastname, dob, gender, phone, cnic, email, street, house, city, occup, exp, price, desc) => {
        const Data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ //parameters to be passed
                name: uname,
                password: pass,
                firstname: firstname,
                lastname: lastname,
                dob: dob,
                gender: gender,
                phone: phone,
                cnic: cnic,
                email: email,
                street: street,
                house: house,
                city: city,
                occup: occup,
                exp: exp,
                price: price,
                desc: desc
            })
        })
            .then(res => res.json())
            .then(Data => {
                if (Data[0].status == 'success') {
                    setSuccessAlert(true)
                    setTimeout(() => {
                        setSuccessAlert(false);
                    }, 3000)
                    setSignIn(true)
                    setSignUpError(null)
                }
                else {
                    if (Data[0].status == 'price')
                        setSignUpError('Price Should Be Between $5 and $25');
                    else if (Data.status == 'age')
                        setSignUpError('Age Must Be Above 18 Years');
                    else {
                        Data[0].status = Data[0].status.toUpperCase()
                        setSignUpError(`${Data[0].status} Already Exists`);
                    }
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false);
                    }, 3000)
                }
            });
    }

    // THIS FUNCTION WILL RUN ON CLICKING SUBMIT BUTTON
    const handleSubmit = async (event) => {

        //Prevent page reload
        event.preventDefault();

        if (!SignIn) {
            // WILL EXECUTE WHEN SIGN UP PAGE SHOWING

            if (isWorker) {
                var { uname, email, firstname, lastname, phone, city, house, street, dob, cnic, pass, radio, confpass, occup, exp, price, desc } = document.forms[0];
                if (confpass.value == pass.value)
                    await createworker('http://localhost:5000/createworker', uname.value, pass.value, firstname.value, lastname.value, dob.value, radio.value, phone.value, cnic.value, email.value, street.value, house.value, city.value, occup.value, exp.value, price.value, desc.value);
                else {

                    setSignUpError(`Password Fields Do Not Match`);
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false);
                    }, 3000)
                }
            }
            else {

                var { uname, email, firstname, lastname, phone, city, house, street, dob, cnic, pass, radio, confpass } = document.forms[0];
                if (confpass.value == pass.value)
                    await createcustomer('http://localhost:5000/createcustomer', uname.value, pass.value, firstname.value, lastname.value, dob.value, radio.value, phone.value, cnic.value, email.value, street.value, house.value, city.value);
                else {

                    setSignUpError(`Password Fields Do Not Match`);
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false);
                    }, 3000)
                }

            }

        } else {

            // WILL EXECUTE WHEN SIGN IN PAGE SHOWING

            var { uname, pass } = document.forms[0];

            if (isWorker) {
                await Login('http://localhost:5000/login', uname.value, pass.value, 'Worker');
            }
            else {
                await Login('http://localhost:5000/login', uname.value, pass.value, 'Customer');
            }
            
            // Compare user info
            if (userData) {
                dispatch(setUser(uname.value));
                setIsSubmitted(true);

            } else {
                // Username not found
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
                setErrorMessages({ name: "uname", message: errors.uname });
            }
        }
    };

    // ---------------------------------- JSX CODE BELOW ----------------------

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // LOGIN FORM
    const renderForm = (
        <div >
            <div className="title1">Sign In</div>
            <div className="form">
                <form onSubmit={handleSubmit}>

                    <InputField label={'UserName'} name={'uname'} type={'text'} />
                    <InputField label={'Password'} name={'pass'} type={'password'} />

                    <div className="button-container">
                        <input type="submit" />
                    </div>

                </form>
            </div>
        </div>
    );

    // SIGN UP FORM
    const renderSignUp = (
        <div>
            <div className="title2" style={{ marginBottom: page ? '1rem' : '1rem', marginTop: page ? (isWorker ? '-1rem' : '4.5rem') : '1.5rem' }} >Sign Up</div>
            <div className="form">
                <form onSubmit={handleSubmit}>

                    <div id="name" className={!page ? "multipleFields" : " hideDisplay"}>
                        <InputField label={'User Name'} id={'uname'} type={'text'} />
                        <InputField label={'Email'} id={'email'} type={'email'} />
                    </div>

                    <div id="name" className={!page ? "multipleFields" : " hideDisplay"}>
                        <InputField label={'First Name'} id={'firstname'} type={'text'} />
                        <InputField label={'Last Name'} id={'lastname'} type={'text'} />
                    </div>

                    <div id="phone_city" className={!page ? "multipleFields" : " hideDisplay"}>
                        <InputField label={'Phone'} id={'phone'} pattern={'03[0-6]{1}[0-9]{1}-[0-9]{7}'} type={'tel'} />
                        <Cities />
                    </div>

                    <div id="age_cnic" className={!page ? "multipleFields" : " hideDisplay"}>
                        <InputField label={'House Number'} id={'house'} type={'text'} />
                        <InputField label={'Street Number'} id={'street'} type={'text'} />
                    </div>

                    <div id="age_cnic" className={page ? "multipleFields" : " hideDisplay"}>
                        <InputField label={'Date of Birth'} id={'dob'} type={'date'} />
                        <InputField label={'CNIC'} id={'cnic'} type={'text'} />
                    </div>




                    <div className={page ? "multipleFields" : " hideDisplay"}>
                        <InputField label={'Password'} id={'pass'} type={'password'} />
                        <InputField label={'Confirm Password'} id={'confpass'} type={'password'} />
                    </div>

                    {
                        isWorker &&
                        <>
                            <div id="age_cnic" className={page ? "multipleFields" : " hideDisplay"}>
                                <Dropdown />

                                <Experience />
                            </div>
                            <div className={page ? "multipleFields" : " hideDisplay"}>
                                <InputField label={'Price'} id={'price'} type={'number'} min={5} max={25} />
                                <InputField label={'Description'} id={'desc'} type={'text'} />
                            </div>
                        </>
                    }

                    <div className={page ? "input-container" : " hideDisplay"} id="gender">
                        <label>Gender </label>
                        <label className="container">Male
                            <input type="radio" checked="checked" name="radio" value='M' />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">Female
                            <input type="radio" name="radio" value='F' />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    <div className={(page) ? "prevPage" : " hideDisplay"} onClick={() => { setPage(false) }}>
                        Previous Page
                    </div>

                    <div className={(page) ? "button-container" : " hideDisplay"}>
                        <input type="submit" />

                    </div>

                    <div className={!page ? "nextPage" : " hideDisplay"} onClick={() => setPage(true)}>
                        Next Page
                    </div>

                </form>
            </div>
        </div >
    );

    // LOGIN PAGE
    const loginForm = (
        <CSSTransition
            in={SignIn}
            timeout={2000}
            classNames="login-form"
        >
            <div className="login-form" >
                {isSubmitted ? (isWorker ? <Navigate to="/WorkerHome" /> : <Navigate to="/Home" />) : renderForm}

                <div className="toggles">

                    <div className="signUpToggle">
                        < div className="button b2 button-10" id="b2">

                            <input type="checkbox" className="toggle checkbox" onChange={handleWorker} />
                            <div className="knobs">
                                <span>Customer</span>
                            </div>
                            <div className="layer"></div>
                        </div>
                    </div>

                    <div className="signUpToggle" style={{ marginLeft: '35px' }}>
                        < div className="button b2 button-10" id="b1">

                            <input type="checkbox" className="toggle checkbox" onChange={handleChange} />
                            <div className="knobs">
                                <span>Sign In</span>
                            </div>
                            <div className="layer"></div>
                        </div>
                    </div>

                </div>

            </div>
        </CSSTransition>
    );

    // SIGN UP PAGE
    const SignUpForm = (
        <CSSTransition
            in={SignIn}
            timeout={800}
            classNames="login-form"
        >
            <div className="login-form" >
                {isSubmitted ? <div>User is successfully logged in</div> : renderSignUp}
                <div className="toggles">

                    <div className="signUpToggle">
                        < div className="button b2 button-10" id="b2">

                            <input type="checkbox" className="toggle checkbox" onChange={handleWorker} />
                            <div className="knobs">
                                <span>Customer</span>
                            </div>
                            <div className="layer"></div>
                        </div>
                    </div>

                    <div className="signUpToggle" style={{ marginLeft: '35px' }}>
                        < div className="button b2 button-10" id="b1">

                            <input type="checkbox" className="toggle checkbox" onChange={handleChange} />
                            <div className="knobs">
                                <span>Sign In</span>
                            </div>
                            <div className="layer"></div>
                        </div>
                    </div>

                </div>

            </div>
        </CSSTransition>
    );

    return (
        <div className="app">

            <div class={alert ? "alert" : "hideDisplay"}>
                <span class="closebtn" onClick={() => setAlert(false)}>&times;</span>
                {signUpError ? <strong>{signUpError}</strong> : <strong>Incorrect Username or Password!</strong>}
            </div>

            <div class={successAlert ? "alert alert2" : "hideDisplay"}>
                <span class="closebtn" onClick={() => setSuccessAlert(false)}>&times;</span>
                <strong>Account Has Been Created!</strong>
            </div>

            <div id="logoContainer">
                <h1 id="logo">SERVICELY</h1>
            </div>

            <div className="random">
                <div id="characters">
                    <img src={carpenter} id="carpenter" className="character" />
                    <img src={cleaner1} id="cleaner1" className="character" />
                    <img src={cleaner2} id="cleaner2" className="character" />
                    <img src={taylor} id="taylor" className="character" />
                    <img src={electrician} id="electrician" className="character" />
                </div>

                {SignIn ? loginForm : SignUpForm}

            </div>

        </div >
    );
}

export default Login;
// import React from 'react'
// import '../styles/Register.css'

// const Register = () => {
//     return (
//         <div className='page-bg'>
//             < div className="register-form-container" >
//                 <form className="register-form">
//                     <h2 className="form-title">Create Account</h2>

//                     <input type="text" placeholder="Full Name" />
//                     <input type="email" placeholder="Email Address" />
//                     <input type="password" placeholder="Password" />
//                     <input type="password" placeholder="Confirm Password" />

//                     <button type="submit">Register</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Register






import React from "react";
import "../styles/Register.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
    return (
        <div className="page-bg">
            <div className="register-layout">

                <div className="left-content">
                    <h1>Boost Your Typing Skills</h1>
                    <p>
                        Practice with real audio tests and improve
                        speed, accuracy and confidence.
                    </p>

                    <ul>
                        <li>✔ Real exam audio</li>
                        <li>✔ Instant accuracy check</li>
                        <li>✔ Progress tracking</li>
                    </ul>
                </div>

                <div className="register-form-container">
                    <form className="register-form">
                        <h2 className="form-title">Create Account</h2>

                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input type="text" placeholder="Full Name" />
                        </div>

                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input type="email" placeholder="Email Address" />
                        </div>

                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input type="password" placeholder="Confirm Password" />
                        </div>

                        <button type="submit">Register</button>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default Register;

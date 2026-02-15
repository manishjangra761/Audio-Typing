import React from 'react'
import '../styles/Register.css'

const Register = () => {
    return (
        < div className="register-form-container" >
            <form className="register-form">
                <h2 className="form-title">Create Account</h2>

                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register





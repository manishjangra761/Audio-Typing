import React from 'react'
import '../styles/Login.css'

const Login = () => {
    return (
        < div className="login-form-container" >
            <form className="login-form">
                <h2 className="form-title">Login</h2>

                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login

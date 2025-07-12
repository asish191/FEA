import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import useAppStateContext from '../hooks/useAppStateContext'

const LoginForm = () => {
    const { dispatch } = useAppStateContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate()

    const [message, setMessage] = useState("")

    const togglePassword = (event) => {
        event.preventDefault();

        setShowPass(!showPass)
    }

    const authentication = (event) => {
        event.preventDefault();

        if (!email || !password) {
            setMessage("Please fill all required fields")
        } else {
            // Mock authentication - no backend needed
            const mockUsers = [
                { email: "demo@example.com", password: "password123", username: "Demo User" },
                { email: "admin@example.com", password: "admin123", username: "Admin User" },
                { email: "user@example.com", password: "user123", username: "Regular User" }
            ]
            
            const user = mockUsers.find(u => u.email === email && u.password === password)
            
            if (user) {
                console.log("Login successful for user:", user);
                const mockToken = `mock_token_${Date.now()}`
                dispatch({
                    type: "Login",
                    payload: {
                        token: mockToken,
                        email: user.email,
                        username: user.username
                    }
                })
                setMessage("Login successful!")
                navigate("/home")
            } else {
                console.log("Login failed - invalid credentials");
                setMessage("Invalid credentials. Try: demo@example.com / password123")
            }
        }
    }

    return (
        <React.Fragment>
            <label className='email'>Email</label>
            <input
                type='text'
                className='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className='password'>Password</label>
            <input
                type={showPass ? "text" : "password"}
                className='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={(e) => togglePassword(e)} style={{ cursor: "pointer" }}>
                <span>
                    {showPass ? (
                        <FontAwesomeIcon icon={faEye} className='customIcon' />
                    ) : (
                        <FontAwesomeIcon icon={faEyeSlash} className='customIcon' />
                    )}
                </span>
            </span>
            <button className='submit' onClick={(e) => authentication(e)}>
                submit
            </button>
            <span style={{ display: "flex", justifyContent: "center", marginTop: "20px", color: message.includes("successful") ? "green" : "red" }}>
                {message}
            </span>
            <div style={{ 
                marginTop: "20px", 
                padding: "10px", 
                backgroundColor: "#f0f0f0", 
                borderRadius: "5px",
                fontSize: "12px",
                color: "#666"
            }}>
                <strong>Demo Accounts:</strong><br/>
                • demo@example.com / password123<br/>
                • admin@example.com / admin123<br/>
                • user@example.com / user123
            </div>
        </React.Fragment>
    )
}

export default LoginForm

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStateContext from '../hooks/useAppStateContext'

const RegisterForm = () => {
  const { dispatch } = useAppStateContext()
  const navigate = useNavigate()
  
  const [showPass, setShowPass] = useState(false)
  const [message, setMessage] = useState("")

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    city: "",
    street: ""
  })

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!user.email || !user.password || !user.username) {
      setMessage("Please fill all required fields")
      return
    }
    
    // Mock registration
    const mockToken = `mock_token_${Date.now()}`
    dispatch({
      type: "Login",
      payload: {
        token: mockToken,
        email: user.email,
        username: user.username
      }
    })
    setMessage("Registration successful!")
    navigate("/home")
  }


  return (
    <React.Fragment>
      <div className='inputs-container'>
        <div className='input-container'>
          <label className='email'>Email</label>
          <input
            type='text'
            className='email'
            value={user.email}
            onChange={(e) => setUser({
              ...user,
              email: e.target.value
            })}
          />
        </div>
      </div>
      <div className='input-container'>
        <label className='username'>Username</label>
        <input
          type='text'
          className='username'
          value={user.username}
          onChange={(e) => setUser({
            ...user,
            username: e.target.value
          })}
        />
      </div>
      <div className='input-container'>
        <label className='password'>Password</label>
        <input
          type={showPass ? "text" : "password"}
          className='password'
          value={user.password}
          onChange={(e) => setUser({
            ...user,
            password: e.target.value
          })}
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
      </div>
      <div className='inputs-container'>
        <div className='input-container'>
          <label className='city'>City</label>
          <input 
            type="text" 
            className='city'
            value={user.city}
            onChange={(e) => setUser({
              ...user,
              city: e.target.value
            })}
          />
        </div>
        <div className='input-container'>
          <label className='street'>Street</label>
          <input 
            type="text" 
            className='street'
            value={user.street}
            onChange={(e) => setUser({
              ...user,
              street: e.target.value
            })}
          />
        </div>
      </div>
      <button className='submit' onClick={handleSubmit}>
        submit
      </button>
      <span style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {message}
      </span>
    </React.Fragment >
  )
}

export default RegisterForm

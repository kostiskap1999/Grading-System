import React, { useState } from 'react';
import { ICredentials, login, register } from '../api/loginApi';
import '../styles/login.scss';

import { useDispatch } from 'react-redux';
import { LOGIN_USER } from "../store/types";

export default function LoginPage() {
  const [credentials, setCredentials] = useState<ICredentials>({username: "", password: ""})
  
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()

  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(credentials){
      e.preventDefault()

      if(isRegistering && password !== "" && confirmPassword !== "" && password !== confirmPassword){
        alert("amogus")
        return
      }
        

      let user
      if(isRegistering)
        user = await register(credentials)
      else
        user = await login(credentials)
      user && dispatch({ type: LOGIN_USER });
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCredentials((prevCredentials: ICredentials) => {
        const newCredentialsCopy: ICredentials = { ...prevCredentials }

        switch(event.target.id) {
            case "username" :
                newCredentialsCopy.username = event.target.value
                break
            case "firstName" :
                newCredentialsCopy.firstName = event.target.value
                break
            case "lastName" :
                newCredentialsCopy.lastName = event.target.value
                break
            case "email" :
              newCredentialsCopy.email = event.target.value
              break
            case "password" :
                setPassword(event.target.value)
                if ((isRegistering && event.target.value === confirmPassword) || !isRegistering)
                  newCredentialsCopy.password = event.target.value
                else
                  newCredentialsCopy.password = ""

                break
            case "confirm-password" :
              setConfirmPassword(event.target.value)
              if ((isRegistering && event.target.value === password) || !isRegistering)
                newCredentialsCopy.password = event.target.value
              else
                newCredentialsCopy.password = ""
              break
            default:
                console.log("error")
                break
        }



        return newCredentialsCopy
    })
  }

  return (
    <div className="page column">
      <div className='header-text center' style={{padding: "100px"}}>Welcome to React Grading System</div>
      <div className="center column login-header">
        <form action="#" className='center column login-form' onSubmit={(event) => handleSubmit(event)}>
          
          {isRegistering ?
            <div className='row'>
              <label>
                <span>Username</span>
                <input
                  id="username"
                  type="text"
                  defaultValue={credentials.username}
                  required
                  onChange={(event) => handleChange(event)}
                />
              </label>
              <label>
                  <span>Email</span>
                  <input
                    id="email"
                    type="email"
                    defaultValue={credentials.email}
                    required
                    onChange={(event) => handleChange(event)}
                  />
                </label>
            </div>
          :
            <label>
              <span>Username</span>
              <input
                id="username"
                type="text"
                defaultValue={credentials.username}
                required
                onChange={(event) => handleChange(event)}
              />
            </label>
          }


          {isRegistering &&
            <div className='row'>
              <label>
                <span>First Name</span>
                <input
                  id="first-name"
                  type="text"
                  defaultValue={credentials.firstName}
                  required
                  onChange={(event) => handleChange(event)}
                />
              </label>
              <label>
                <span>Last Name</span>
                <input
                  id="last-name"
                  type="text"
                  defaultValue={credentials.lastName}
                  required
                  onChange={(event) => handleChange(event)}
                />
              </label>
          </div>
        }

          {isRegistering ?
            <div className='row'>
              <label>
                <span>Password</span>
                <input
                  id="password"
                  type="password"
                  defaultValue={password}
                  required
                  onChange={(event) => handleChange(event)}
                />
              </label>
              <label>
                <span>Confirm Password</span>
                <input
                  id="confirm-password"
                  type="password"
                  defaultValue={confirmPassword}
                  required
                  onChange={(event) => handleChange(event)}
                />
              </label>
            </div>
          :
            <label>
              <span>Password</span>
              <input
                id="password"
                type="password"
                defaultValue={password}
                required
                onChange={(event) => handleChange(event)}
              />
            </label>
          }
          <div style={{minHeight: "35px"}}>
          <span hidden={!isRegistering && password === "" || confirmPassword === "" || password === confirmPassword}>Passwords do not match</span>
          </div>
          <input type="submit" disabled={isRegistering && confirmPassword !== "" && password !== "" && password !== confirmPassword} value={isRegistering ? "Register" : "Log In"}/>
        </form>
        {isRegistering ?
          <span>Already have an account? <button className='register-login-switch' onClick={() => {setIsRegistering(false)}}>Log In</button></span>  
        :
          <span>Don't have an account? <button className='register-login-switch' onClick={() => {setIsRegistering(true)}}>Register</button></span>  
        }
      </div>
      <div></div>
    </div>
  );
}

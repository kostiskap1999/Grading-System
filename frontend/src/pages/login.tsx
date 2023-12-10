import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../api/loginApi';
import '../styles/login.scss';

import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { User } from '../model/user';
import { LOGIN_USER } from "../store/types";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isEnabled, setEnabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user: User | null = await login({username, password})
    user && dispatch({ type: LOGIN_USER });
  }

  const handleKeyUp = () => {
    if (username.length > 0 && password.length > 0)
      setEnabled(false);
    else
      setEnabled(true);
  };

  return (
    <div className="login">
      <header className="login-header">

        <form action="#" onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label>
              <div>Username</div>
              <input
                type="text"
                value={username}
                onKeyUp={handleKeyUp}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </div>
          
          <br/>
          
          <div>
            <label>
              <div>Password</div>
              <input
                type="password"
                value={password}
                onKeyUp={handleKeyUp}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <button disabled={isEnabled}>
            Log In
          </button>  
        </form>
      </header>
    </div>
  );
}

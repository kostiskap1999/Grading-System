import React, {useState} from 'react';
import '../styles/login.scss';
import { login } from '../fetches/login';
import { useNavigate } from "react-router-dom";

import { LOGIN_USER } from "../store/types";
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { fetchToken } from '../fetches/helpers/tokenHelpers';
import { IUser } from '../interfaces/iUser';

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isEnabled, setEnabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user: IUser = await login({username, password})
    // const token = ""

    
    if (user.id !== -1){
      const cookies = new Cookies();
      cookies.set('user_id', JSON.stringify(user.id), { path: '/' }); //temporary solution, will implement proper token later
      // cookies.set('token', JSON.stringify(token), { path: '/' });
      // cookies.set('role-temp', user.role, { path: '/' });
      dispatch({ type: LOGIN_USER });
      navigate("/home")
    }
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

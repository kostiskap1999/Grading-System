import React, {useState} from 'react';
import '../styles/login.scss';
import { login } from '../fetches/login';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isEnabled, setEnabled] = useState(true)

  const handleSubmit = async () => {
    const user = await login({username, password})
    console.log(user)
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

        <form action="#" onSubmit={handleSubmit}>
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

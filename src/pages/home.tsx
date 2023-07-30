import React, {useState} from 'react';
import '../styles/login.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isEnabled, setEnabled] = useState(true)
  const navigate = useNavigate()

  const {state} = useLocation();
  const user = state
  
  return (
    <div className="login">
      Hi {JSON.stringify(user)}
    </div>
  );
}

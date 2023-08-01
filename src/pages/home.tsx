import React, { useState } from 'react';
import '../styles/login.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../store/types';
import Cookies from 'universal-cookie';

export default function HomePage() {
  const [isEnabled, setEnabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { state } = useLocation();
  const cookies = new Cookies();
  const user = cookies.get('user')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: LOGOUT_USER });
    navigate("/home")
  }

  return (
    <div className="login">
      Hi {JSON.stringify(user)}
      <form action="#" onSubmit={(event) => handleSubmit(event)}>
          <button>
            Log Out
          </button>  
      </form>
    </div>
    
  );
}

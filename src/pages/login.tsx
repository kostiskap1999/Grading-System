import React, {useState} from 'react';
import '../styles/login.scss';
import { User } from '../model/user';
import { Student } from '../model/student';
import { Professor } from '../model/professor';
import { Admin } from '../model/admin';

export default function Login() {
  const [value, useValue] = useState(0)

  const handleSubmit = () => {
    var user = new User()
    console.log(user)
    var student = new Student()
    console.log(student)
    var professor = new Professor()
    console.log(professor)
    var admin = new Admin()
    console.log(admin)
    admin.joinClass()
  }

  const handleChange = () => {
    console.log('changed')
  }

  return (
    <div className="login">
      <header className="login-header">

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <div>Username</div>
              <input
                type="text"
                value={value}
                onChange={handleChange}
              />
            </label>
          </div>
          
          <br/>
          
          <div>
            <label>
              <div>Password</div>
              <input
                type="password"
                value={value}
                onChange={handleChange}
              />
            </label>
          </div>
          
          <input type="submit" value="Submit" />
        </form>
        <button
          onClick={handleSubmit}
        >Test</button>
      
      </header>
    </div>
  );
}

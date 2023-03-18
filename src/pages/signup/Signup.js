import React, { useState } from 'react'
import { axiosClient } from '../../utils/axiosClient';
import './Signup.scss';

function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSubmit(e){
   e.preventDefault();
   const result = await axiosClient.post('/auth/signup', {
    name,
    email,
    password,
   })
   console.log(result);
  }
  return (
    <div className='Signup'>
      <div className="signup-box">
        <h2 className="heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text"
            className='name' 
            id='name' 
            onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="email">E-Mail</label>
            <input type="email" 
            className='email' 
            id='email' 
            onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" 
            className='password' 
            id='password' 
            onChange={(e) => setPassword(e.target.value)}/>

            <input type="submit" className='submit' />
        </form>
        <p className='subheading'>Do Not have an account ? </p>
      </div>
    </div>
  )
}

export default Signup
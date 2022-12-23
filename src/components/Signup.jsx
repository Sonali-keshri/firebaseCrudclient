import React, { useState } from 'react'
import SignupImg from '../assets/img1.png';
import {Link, useNavigate} from "react-router-dom";
import { useUserAuth } from '../context/userAuthContext';
import { Alert } from 'react-bootstrap';





const Signup = () => {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')
 const {signup} = useUserAuth();

 const navigate = useNavigate();
 const handleSubmit = async (e)=>{
  e.preventDefault();
  setError('');
  try {
    await signup(email, password);
    navigate('/login');
  } catch (error) {
    setError(error.message);
  }
 }
  return (
    <>
    <div className="page">
      <div  className='wrapper signupContainer'>
        <div className="formside">
          {error && <Alert variant='danger'>{error}</Alert>}
            <h2>Sign Up</h2>
            <form className='signup-Form' onSubmit={handleSubmit}>
                <input type="email" placeholder=' Your Email' onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder='Your Password' onChange={(e)=> setPassword(e.target.value)}/>
                <button className='' type="submit">Submit</button>
            </form>
            <p>Already have an account ? <span><Link to='/login'>Login</Link></span></p>
        </div>
        <div className="imgside">
        <img src={SignupImg} alt="img" className='img'/>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Signup

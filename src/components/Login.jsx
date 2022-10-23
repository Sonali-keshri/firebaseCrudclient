import React, {useState} from "react";
import SigninImg from "../assets/img2.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/userAuthContext';
import { Alert } from 'react-bootstrap';
import {AiOutlineGooglePlus} from 'react-icons/ai';
import { async } from "@firebase/util";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login , googlesignin, passwordreset} = useUserAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async (e)=>{
    e.preventDefault();
    try {
      await googlesignin();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }
  const handleforgetpassword = async (e) =>{
    e.preventDefault();
    try {
      await passwordreset();
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="page">
        <div className="container signinContainer">
          <div className="imgside ">
            <img src={SigninImg} alt="img" className="signinimg" />
          </div>
          <div className="formside signinForm">
          {error && <Alert variant='danger'>{error}</Alert>}
            <h2>Login</h2>
            <form className="signup-Form" onSubmit={handleSubmit}>
              <input type="email" placeholder=" Your Email" onChange={(e)=> setEmail(e.target.value)} />
              <input type="password" placeholder="Your Password" onChange={(e)=> setPassword(e.target.value)} />
              <button className="" type="submit">
                Submit
              </button>
       
              <button className='googlebtn' onClick={handleGoogleSignin}><AiOutlineGooglePlus/>Sign In with Google</button>
              <span className="forgetpass" onClick={handleforgetpassword}>Forget Password</span>
            </form>
            <p>
              Already have an account ?{" "}
              <span>
                <Link to="/signup">SignUp</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

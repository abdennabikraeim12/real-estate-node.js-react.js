import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/amazon.webp";
import "./login.css"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = () => {

  
  const [email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const navigate = useNavigate()

  const signUp = (event)=>{
    event.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then((auth)=>
    {
      if(auth){
        navigate("/")
      }
    }).catch((error)=>{
      alert(error.message)
    })
  }

  //methode for register:
  
  const register = (event)=>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth ,email,password).then((auth)=>
    {
      if(auth){
        navigate("/")
      }
    }).catch((error)=>{
      alert(error.message)
    })
  }


  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={logo} alt="amz" />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <h5>Password</h5>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <button style={{cursor:"pointer"}} className="login-signInBtn" type="submit" onClick={signUp}>
            sign in
          </button>
         <p>by continuing,you agree to Amazon's fake Clone Condition of Use and privacy Notice</p>

         <button style={{cursor:"pointer"}} className="login-registerBtn" onClick={register}>Create your Amazon Account</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

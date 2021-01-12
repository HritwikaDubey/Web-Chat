import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateProviderValue } from "./StateProvider";
import {actionTypes} from "./reducer";
import girl from './girl.png';

function Login() {
  const [{}, dispatch] = useStateProviderValue();
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((result) => {
      dispatch({
        type: "SET_USER",
        user: result.user,
      });
    })
    .catch((error) => alert(error.message));
  }

  return (
    
    <div className="login"> 
      <div className="login__container">
        <h2 className="cont__txt">S. B. Public School <br/>Web Chat Login</h2>
      <div className="pic">
      <img src={girl} height="500vh" width="700vw"
        style={{
          position:"relative",
          marginTop:-60,
          marginLeft:-420
          }} alt=""></img>
      </div>
       <div className="vl"></div>
        <input className="text" 
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}>
        </input>
        
        <input className="text1" 
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}>
        </input>
        
        <input className="text2" 
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}>
        </input>


        <button className="button" 
         type="submit" 
         onClick={signUp}>
          <span>Sign In</span>
         </button>

         <button className="button1" 
         type="submit" 
         onClick={signIn}>
          <span>Sign In with Google</span>
         </button>
       </div>
    </div>
  );
}

export default Login;


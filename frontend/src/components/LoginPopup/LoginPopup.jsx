import {React,useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setshowLogin}) => {


    const [currState, setcurrState] = useState("Login")
    // const [currState, setcurrState] = useState("Sign Up")
  return (
    <>
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <div className='croos' onClick={()=>setshowLogin(false)}><ion-icon className="w-100" name="close-outline"></ion-icon></div>
                </div>
                <div className="login-popup-inputs">
                    {currState==="Login"?<></>:
                    <input type="text" placeholder="Your Name" required/>
                    }
                    <input type='email' placeholder='Your Email' required/>
                    <input type="password" placeholder='password' required  />
                </div>
                <button>{currState==="Sign Up"?"Create account":"Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing , i agree to terms of ude and privacy policy</p>

                </div>
                {
                    currState==="Login"?
                    <p>Already have an  account ? <span onClick={()=>setcurrState("Sign Up")}>Login here</span></p>
                    :<p>Create a new account ? <span onClick={()=>setcurrState("Login")}>Click here</span></p>

                }
            </form>
        </div>
    </>
  )
}

export default LoginPopup
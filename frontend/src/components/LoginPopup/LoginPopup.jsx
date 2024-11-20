import {React,useState,useContext} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setshowLogin}) => {


    const {url,token,setToken} = useContext(StoreContext)


    const [currState, setcurrState] = useState("Login")

    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) =>{
        event.preventDefault()

        let newUrl = url;
        if(currState ==="Login"){
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setshowLogin(false)
        }
        else{
            alert(response.data.message)
        }

    }

    // useEffect (()=>{
    //     console.log(data);
        
    // },[data])
    // const [currState, setcurrState] = useState("Sign Up")
  return (
    <>
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <div className='croos' onClick={()=>setshowLogin(false)}><ion-icon className="w-100" name="close-outline"></ion-icon></div>
                </div>
                <div className="login-popup-inputs">
                    {currState==="Login"?<></>:
                    <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder="Your Name" required/>
                    }
                    <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required  />
                </div>
                <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
                {currState==="Sign Up"?
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing , i agree to terms of ude and privacy policy</p>

                </div>:" "
                }
                {
                    currState==="Login"?
                    <p>Create a new account ? <span onClick={()=>setcurrState("Sign Up")}>Click here</span></p>
                    :<p>Already have an  account ? <span onClick={()=>setcurrState("Login")}>Login here</span></p>

                }
            </form>
        </div>
    </>
  )
}

export default LoginPopup
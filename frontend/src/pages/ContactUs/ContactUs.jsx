import React ,{useState} from 'react'
import "./ContactUs.css"

import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast functions
import 'react-toastify/dist/ReactToastify.css';  // Import the required CSS


const ContactUs = () => {
  // const [check, setcheck] = useState(false)

  const checkinfo = () => {
    let name = document.getElementById('name-contact').value
    let email = document.getElementById('email-contact').value
    let message = document.getElementById('message-contact').value
    if (name===""||email===""||message===""){
      toast.error('Please fill all the fields')
    }
    else{
      name = "";
      email = "";
      message = "";
      toast.success("Your message was received");
    }
  }
  const [copy, setCopy] = useState('');


  


  const copyContent = async (text,copied) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${copied} was copied`);
      
      
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  
  return (
    <>
       <ToastContainer />
      <div className="contact-us text-center ">
        <h1 className='text-6xl	my-12 '>Contact Us</h1>
        
        <button onClick={()=>copyContent("ranvirbhatti2106@gmail.com","Email")} className="box text-2xl flex justify-between">
          <div className='px-4'>
          <ion-icon name="mail-outline" size="large"></ion-icon>
          </div>
          
          {/* <div className=''> */}

           ranvirbhatti2106@gmail.com
          {/* </div> */}
        </button>
        
        <button onClick={()=>copyContent("+91 6261295658"," Phone No.")} className="box text-2xl flex justify-start">
          <div className='px-4 mr-4'>
          <ion-icon name="call-outline" size="large"></ion-icon>
          </div>
           +91 6261295658
        </button>
        {copy && <div>{copy}</div>}
        <form className='contactus-form flex justify-between items-start flex-col	'>
            <h2 className='text-4xl	mb-4 mx-auto'>Send us a Message</h2>
            {/* <p>Enter Your Name</p> */}
            <input
              required
              type="text"
              placeholder="Enter Your Name"
              id='name-contact'
            />
            {/* <p>Enter Your Email</p> */}
            <input
              required
              type="email"
              placeholder="Enter Your Email"
              id='email-contact'
            />
            {/* <p>Enter your Query</p> */}
            
            <textarea rows="6" required id='message-contact' className='query-form'  placeholder="Enter your message here"></textarea>

            <button type='reset' onClick={checkinfo} >Send</button>

          
        </form>
      </div>
    </>
  )
}

export default ContactUs
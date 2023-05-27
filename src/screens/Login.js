import React from 'react'
import { getAuth, signInAnonymously  } from "firebase/auth";
import '../style/login.css'

const Login = () => {
    const auth = getAuth();

    const signin = async () => {
        signInAnonymously(auth)
          .then((user) => {
            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
    }

  return (
    <div style={{width: '100vw'}} className='main-wrapper'>
        <h1>ChatAway</h1>
        <span className='text'>💬 ChatAway is an anonymous chat room web app. 💬</span>
        <span className='text'>👀 It was built to provide a <b>live chat</b> feature to all youtube videos 👀</span>
        <span className='text'>🏁 Start a session to get started! 🏁</span>
        <button className='button' onClick={() => signin()}>Start Session</button>
    </div>
  )
}

export default Login
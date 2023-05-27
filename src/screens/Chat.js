import { getAuth, signOut, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import '../style/chat.css'
import Message from '../components/Message'
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

const Chat = () => {
    const [username, setUsername] = useState(null)
    const [url, setUrl] = useState(null)
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState()
    var unsubscribe = null

    const auth = getAuth();
    const db = getFirestore();

    const signout = async () => {
        signOut(auth)
          .then(() => {
            unsubscribe()
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
    }

    const update = async () => {
        updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
                console.log(auth.currentUser)
                setUser(auth.currentUser)
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }

    const sendMessage = async () => {
        console.log("test")
        if (message != '') {
            console.log("test2")
            await addDoc(collection(db, "messages"), {
                message: message,
                username: user.displayName,
                url: url,
                date: new Date(),
                uid: user.uid
              });
        }
        setMessage('')
    }

    useEffect(() => {
        const q = query(collection(db, "messages"), where("url", "==", url), where("date", ">=", new Date()), orderBy("date"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            console.log(messages)
            setMessages(messages)
            console.log("updated")
        });
    },[url])

    console.log(messages)

    return (
        <div style={{width: '100vw'}}>
            <div className="navbar">
                <span className='logo-brand'>ChatAway</span>
                <button className='button' onClick={() => signout()}>signout</button>
            </div>
            {user ? 
            <div className='main-wrapper'>
                <span style={{marginTop: 20}} className='welcome-header'>Chatroom 💬</span>
                <div className='chat-wrapper'>
                    <div className='chat-container'>
                        {messages?.map((message) => {
                            return <Message msg={message} uid={user.uid}></Message>
                        })}
                    </div>
                </div> 
                    <div className='messagesender'>
                        <input className="input" style={{width: '100%'}} value={message} onChange={(e) => setMessage(e.target.value)}></input>
                        <button className='button' onClick={() => sendMessage()} disabled={username == null && url == null}>Send</button>
                    </div>     
            </div>
            : 
            <div className='main-wrapper'>
                <span style={{marginTop: 20}}  className='welcome-header'>Welcome! 👋</span>
                <span className='text'>To begin chatting, enter a <b>username</b> and <b>youtube URL</b></span>
                <input className='input' placeholder='Username' title='username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input className='input' placeholder='Youtube URL' title='url' value={url} onChange={(e) => setUrl(e.target.value)}></input>
                <button className='button' onClick={() => update()} disabled={username == null && url == null}>Start Chatting</button>
            </div>}
        </div>
    )
}

export default Chat
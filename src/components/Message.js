import React, { useEffect, useState } from 'react'
import './message.css'

const Message = ({msg, uid}) => {
    console.log("in message" + Date(msg.date))
    const [time, setTime] = useState()

    useEffect(() => {
        const date = Date(msg.date)
        setTime(date)
    }, [])

  return (
    <div className='message-container'>
        <div className='message-body' style={uid == msg.uid ? {alignItems: 'flex-end', backgroundColor: 'rgb(173,216,230)'} :{alignItems: 'flex-start'}}>
            <span className='username'>{msg.username}</span>
            <span className='message'>{msg.message}</span>
            {/* <span className='date'>{time}</span> */}
        </div>
    </div>
  )
}

export default Message
import "./message.css"
import { format } from "timeago.js";
import React from 'react'

function Message({message,own}) {
  return (
    <>
      
      <div className={own ? "message own" : "message"}>
      <div className="messageTop">
      { !message.media? <p className="messageText">{message.text}</p> :
      <div className="media"> <img src={message.media} alt="" /></div> }
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>



    </>
  )
}

export default Message


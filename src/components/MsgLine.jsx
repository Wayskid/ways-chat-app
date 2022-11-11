import React from 'react'

export default function MsgLine({message}) {
  return (
   <li className={`messageLine ${message.source === "user" ? "justifyRight" : "justifyLeft"}`}>
      <p className="msg">{message.msg}</p>
      <p className="timeSent">{new Date(message.timeStamp).toLocaleTimeString([],{
         hour:"2-digit",
         minute:"2-digit",
         hour12: true
      })}</p>
   </li>
  )
}

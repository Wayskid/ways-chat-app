import { useContext } from 'react'
import uuid from "react-uuid";
import Laptop from "../laptop.png"
import Arrow from "../arrow.png"
import Phone from "../phone.png"
import MsgAppContext from '../context/MsgAppContext'
import MsgLine from './MsgLine'


export default function Main() {

   const {
      activeChat,
      handleMessageVal,
      messageVal,
      chatList,
      setChatList,
      setMessageVal,
      chatMenuShown,
      setchatMenuShown,
      handleAltCloseMenu,
   } = useContext(MsgAppContext)

   //Send message

   function submitMessage(e){
      e.preventDefault()

      const newMsg = {
         id: uuid(),
         source: "user",
         msg: messageVal,
         timeStamp: Date.now()
      }

      setChatList(chatList.map(chat=>{
         if (chat.id === activeChat.id) {
            return {
               ...chat,
               messages: [
                  ...activeChat.messages,
                  newMsg
               ]
            }
         }else{
            return chat
         }
      }))

      setMessageVal("")
   }

   //Chat Menu
   function handleShowChatMenu() {
      setchatMenuShown(!chatMenuShown)
   }

   //Delete Chat
   function handleDelete(id){
      setChatList(chatList.filter(chat=>{
         return chat.id !== id
      }))
   }

   //Archive Chat

   function handleArchiveChat(id){
      setChatList(chatList.map(chat=>{
         if (chat.id === id) {
            return {
               ...chat,
               archived: !chat.archived
            }
         }else{
            return chat
         }
      }))
   }

   //Clear Chat
   function handleClearChat(id){
      setChatList(chatList.map(chat=>{
         if (chat.id === id) {
            return {
               ...chat,
               messages: []
            }
         }else{
            return chat
         }
      }))
   }

  return (
    <div className='Main'>
      { activeChat ? 
         <div className="mainBody">
            <header className='mainHeader'>
               <h3 className="contactNameHead">{activeChat.name}</h3>
               <div className="chatMenu" onClick={handleShowChatMenu}>
                  <div></div>
                  <div></div>
                  <div></div>
                  {chatMenuShown && <ul className="mainHeaderMenu">
                     <li className="deleteChat" onClick={()=>handleDelete(activeChat.id)}>Delete Chat</li>
                     <li className="archiveChat" onClick={()=>handleArchiveChat(activeChat.id)}>{activeChat.archived === true ? "Una" : "A"}rchive Chat</li>
                     <li className="clearChat" onClick={()=>handleClearChat(activeChat.id)}>Clear Chat</li>
                  </ul>}
               </div>
            </header>
            <ul className="messageList" onClick={handleAltCloseMenu}>
               {
                  activeChat.messages.map(message=>{
                     return <MsgLine 
                        key={message.id}
                        message={message}
                     />

                  })
               }
            </ul>
            <div className="chatFooter">
               <form onSubmit={submitMessage}>
                  <input
                     type="text"
                     placeholder='Write message...'
                     onChange={handleMessageVal}
                     value={messageVal}
                  />
                  <button>SEND</button>
               </form>
            </div>
         </div> :
         <div className="mainInitial">
            <div className="icons">
               <img src={Laptop} alt="Laptop" />
               <img src={Arrow} className="arrow" alt="Arrow" />
               <img src={Phone} alt="Phone" />
            </div>
            <h1>WaysChat for Desktop</h1>
            <p className='des'>Send and receive messages without keeping your phone online. Use WaysChat on up to 4 linked devices and 1 phone at the same time.</p>
            <p className="encrypt">End-to-end encrypted</p>
         </div>
      }
    </div>
  )
}

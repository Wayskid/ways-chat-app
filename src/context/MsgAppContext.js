import { createContext, useEffect, useState } from "react";
import UserData from "../UserData";

const MsgAppContext = createContext();

export function MsgAppProvider ({children}){

   //Chat List
   const [ chatList, setChatList ] = useState(UserData);
   
   //Active chat
   const [ activeChatID, setActiveChatID ] = useState("");

   function getActiveChatID(idClicked){
      setActiveChatID(idClicked)
   }

   function getActiveChat(){
      return chatList.find(chat=> chat.id === activeChatID)
   }

   //Send message
   const [ messageVal, setMessageVal ] = useState("")

   function handleMessageVal(e){
      setMessageVal(e.target.value)
   }
   
   //Search Contacts
   const[ searchedChatList, setSearchedChatList ] = useState(chatList)
   const[ searchVal, setSearchVal ] = useState("")

   //Chat Menu
   const [ chatMenuShown, setchatMenuShown ] = useState(false)

   function handleAltCloseMenu(){
      setchatMenuShown(false)
   }

   //Archive Chat
   const [ archiveList, setArchiveList ] = useState([])
   

   //Use effect
   useEffect(()=>{
      setSearchedChatList(chatList)
      setArchiveList(chatList.filter(chat=>{
         if (chat.archived === true){
            return chat
         }else{
            return null
         }
      }))

      const randNum = Math.floor(Math.random() * chatList.length)
      console.log(randNum);
   },[chatList])




   return <MsgAppContext.Provider value={{
      chatList,
      setChatList,
      getActiveChatID,
      activeChatID,
      activeChat: getActiveChat(),
      handleMessageVal,
      messageVal,
      setMessageVal,
      setSearchedChatList,
      searchedChatList,
      searchVal,
      setSearchVal,
      chatMenuShown,
      setchatMenuShown,
      handleAltCloseMenu,
      setArchiveList,
      archiveList,
   }}>
      {children}
   </MsgAppContext.Provider>
}

export default MsgAppContext;
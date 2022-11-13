import { createContext, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
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
   },[chatList])

   //Add New Contact
   const [ contactWindowShown, setContactWindowShown ] = useState(false);
   const [ newContactInfo, setNewContactInfo ] = useState({
      id: uuid(),
      name: "",
      number: "",
      email: "",
      messages: [],
      lastModified: Date.now(),
      isRead: true,
      archived: false
   });

   function handleShowcontactWindow(){
      setContactWindowShown(!contactWindowShown)
   }

   function handleNewContactInput(e){
      setNewContactInfo(prevInfo=>{
         return {
            ...prevInfo,
            [e.target.name]: e.target.value
         }
      })
   }

   function handleSaveContact(e){
      e.preventDefault();

      if(
            newContactInfo.name.trim() &&
            newContactInfo.email.trim() &&
            newContactInfo.email.trim()
         ){
         setChatList([...chatList, newContactInfo])
         handleShowcontactWindow()

         setNewContactInfo({
            ...newContactInfo,
            id: uuid(),
            name: "",
            number: "",
            email: ""
         })
         setActiveChatID(newContactInfo.id)
      }
   }




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
      handleShowcontactWindow,
      contactWindowShown,
      handleNewContactInput,
      newContactInfo,
      handleSaveContact,
   }}>
      {children}
   </MsgAppContext.Provider>
}

export default MsgAppContext;
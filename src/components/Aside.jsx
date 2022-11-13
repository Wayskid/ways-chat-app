import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import MsgAppContext from "../context/MsgAppContext";
import ChatCard from "./ChatCard";

export default function Aside() {
   const {
      chatList,
      setSearchedChatList,
      searchedChatList,
      searchVal,
      setSearchVal,
      handleAltCloseMenu,
      archiveList,
      handleShowcontactWindow
   } = useContext(MsgAppContext);

   //Search Contacts
   function handleSearch(e) {
      setSearchVal(e.target.value);
      if (e.target.value) {
         setSearchedChatList(
            chatList.filter((chat) => {
               if (
                  chat.name
                     .toLowerCase()
                     .includes(e.target.value.trim().toLowerCase())
               ) {
                  return chat.name;
               }else{
                  return null
               }
            })
         );
      } else {
         setSearchedChatList(chatList);
      }
   }

   // //Show Archive
   const [archiveShown, setArchiveShown] = useState(false);

   function handleShowArchive() {
      setArchiveShown(!archiveShown);
   }

   return (
      <div className="aside" onClick={handleAltCloseMenu}>
         <header>
            <h2>WaysChat</h2>
         </header>
         <div className="asideBody">
            <div className="archiveSearch">
               <div className="archive" onClick={handleShowArchive}>
                  {archiveShown && <FaArrowLeft />}
                  <h3>Archive</h3>
                  {!archiveShown && <p>{archiveList.length}</p>}
               </div>
               <div className={`searchPlus ${archiveShown && "disappear"}`} >
                  <input
                     type="text"
                     placeholder="Search Contacts..."
                     className="searchInput"
                     onChange={handleSearch}
                  />
                  <FaPlus onClick={handleShowcontactWindow}/>
               </div>
            </div>
            <ul className="chatList">
               {!archiveShown ? (
                  searchedChatList.length ? (
                     searchedChatList
                        .sort((a, b) => b.lastModified - a.lastModified)
                        .map((chat) => {
                           if (chat.archived === false) {
                              return <ChatCard key={chat.id} chat={chat} />;
                           }else{
                              return null
                           }
                        })
                  ) : (
                     <p className="noResult">
                        {searchVal ? <p>Sorry, <strong>"{searchVal}" </strong>is not on your
                        contacts list.</p> : <p>No Contacts</p>}
                     </p>
                  )
               ) : archiveList.length ? (
                  archiveList
                     .sort((a, b) => b.lastModified - a.lastModified)
                     .map((chat) => {
                        if (chat.archived === true) {
                           return <ChatCard key={chat.id} chat={chat} />;
                        }else{
                           return null
                        }
                     })
               ) : (
                  <p className="noResult">Archive is empty</p>
               )}
            </ul>
         </div>
      </div>
   );
}

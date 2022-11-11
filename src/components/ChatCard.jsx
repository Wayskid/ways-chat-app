import { useContext } from "react"
import MsgAppContext from "../context/MsgAppContext"

export default function ChatCard({chat}) {

   const {
      getActiveChatID,
      activeChatID
   } = useContext(MsgAppContext)

  return (
   <li className={`chatCard ${activeChatID === chat.id && "activeChat"}`} onClick={()=>getActiveChatID(chat.id)}>
      <div className="chatCardLeft">
         <h3>{chat.name}</h3>
         <div className="msgPreview">{chat.messages.length ? chat.messages.slice(-1)[0].msg.substr(0, 100) : "" }...</div>
      </div>
      <p className="lastMod">{new Date(chat.lastModified).toLocaleTimeString([], {
         hour:"2-digit",
         minute:"2-digit",
         hour12: true
      })}</p>
   </li>
  )
}

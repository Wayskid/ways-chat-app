// import { useContext } from "react";
// import { ActiveChatContext } from "../contexts/ActiveChatContext";

import { useContext, useEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";

export default function MsgLine({ message }) {
  const { currentUser } = useContext(AuthContext);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [message]);

  return (
    <li
      className={`chat  relative ${
        currentUser.uid === message.senderId ? "chat-end" : "chat-start"
      }`}
      ref={scrollRef}
    >
      <div className="chat-bubble py-[8px] bg-color-secondary max-w-[65%]">
        {message.text}
      </div>
      <time className="text-xs font-medium text-color-secondary absolute bottom-[-0.8rem] px-[1rem]">
        {/* {msgDate} */}
      </time>
    </li>

    // <div className="chat chat-end">
  );
}

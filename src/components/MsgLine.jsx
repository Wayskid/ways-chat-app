import { useContext, useEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import moment from "moment/moment";
import ChatAppContext from "../contexts/ChatAppContext";

export default function MsgLine({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { handleViewImage } = useContext(ChatAppContext);

  const scrollRef = useRef();

  //SCROLL TO THE BOTTOM
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
      {message.text ? (
        <p
          className={`chat-bubble py-[8px]  max-w-[65%] ${
            currentUser.uid === message.senderId
              ? "bg-color-primary "
              : "bg-color-secondary"
          }`}
        >
          {message.text}
        </p>
      ) : (
        <img
          src={message.image}
          alt="sent pic"
          className={`h-[10rem] cursor-pointer ${
            currentUser.uid === message.senderId ? "" : "pl-[0.75rem]"
          }`}
          onClick={handleViewImage}
        />
      )}
      <time className="text-xs font-medium text-color-secondary absolute bottom-[-0.8rem] px-[0rem]">
        {moment(message.date.toDate()).calendar()}
      </time>
    </li>

    // <div className="chat chat-end">
  );
}

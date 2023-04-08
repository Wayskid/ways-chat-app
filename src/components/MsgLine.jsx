import { useContext, useEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import moment from "moment/moment";

export default function MsgLine({ message }) {
  const { currentUser } = useContext(AuthContext);

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
      <div
        className={`chat-bubble py-[8px]  max-w-[65%] ${
          currentUser.uid === message.senderId
            ? "bg-color-primary "
            : "bg-color-secondary"
        }`}
      >
        {message.text}
      </div>
      <time className="text-xs font-medium text-color-secondary absolute bottom-[-0.8rem] px-[0rem]">
        {moment(message.date.toDate()).calendar()}
      </time>
    </li>

    // <div className="chat chat-end">
  );
}

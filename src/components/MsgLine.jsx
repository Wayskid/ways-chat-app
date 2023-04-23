import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import moment from "moment/moment";
import ChatAppContext from "../contexts/ChatAppContext";
import { motion } from "framer-motion";

export default function MsgLine({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { handleViewImage } = useContext(ChatAppContext);

  return (
    <>
      <motion.li
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className={`chat  relative ${
          currentUser.uid === message.senderId ? "chat-end" : "chat-start"
        }`}
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
      </motion.li>
    </>
  );
}

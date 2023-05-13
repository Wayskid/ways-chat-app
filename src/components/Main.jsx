import { useContext } from "react";
import MessageList from "./MessageList";
import { IoMdChatbubbles } from "react-icons/io";
import { ActiveChatContext } from "../contexts/ActiveChatContext";
import ChatAppContext from "../contexts/ChatAppContext";
import MsgInput from "./MsgInput";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Main() {
  const { activeChatState } = useContext(ActiveChatContext);

  const {
    state,
    handleDeleteChat,
    handleClearChat,
    handleSendImg,
    dispatch,
    showHide,
  } = useContext(ChatAppContext);

  return (
    <div
      className={`main w-[calc(100%-280px)] border-l-txt-color border-l-[1px] relative bg-color-secondary ${
        state.showMain && "showMain"
      }`}
    >
      {activeChatState.chatId !== "null" ? (
        <>
          <header className="mainHeader flex  gap-3 items-center bg-color-secondary text-neutral-50 h-[60px] px-[10px]">
            <FaArrowLeft className="text-xl " onClick={showHide} />
            <div className="avatar">
              <div className="w-[32px] rounded-full">
                <img src={activeChatState.user.photoURL} alt="Contact Avatar" />
              </div>
            </div>
            <h3 className="contactNameHead font-medium text-xl">
              {activeChatState.user.displayName.slice(0, 15)}
              {activeChatState.user.displayName.length > 15 && "..."}
            </h3>
            <div className="dropdown dropdown-end ml-auto">
              <label
                onClick={() => dispatch({ type: "CHAT_MENU_OPEN" })}
                className="btn m-1 bg-transparent border-none hover:bg-transparent"
              >
                <div className="burger grid gap-1">
                  <div className="h-[5px] w-[5px] bg-txt-color rounded-full"></div>
                  <div className="h-[5px] w-[5px] bg-txt-color rounded-full"></div>
                  <div className="h-[5px] w-[5px] bg-txt-color rounded-full"></div>
                </div>
              </label>
              {state.isChatMenu && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="dropdown-content menu shadow bg-color-primary rounded-md w-[6rem] top-[3rem]"
                >
                  <li onClick={() => dispatch({ type: "CHAT_MENU_OPEN" })}>
                    <button
                      className="p-2 active:bg-color-secondary hover:bg-color-secondary text-sm"
                      onClick={() => handleDeleteChat(activeChatState.user)}
                    >
                      Delete Contact
                    </button>
                  </li>
                  <li onClick={() => dispatch({ type: "CHAT_MENU_OPEN" })}>
                    <button
                      className="p-2 active:bg-color-secondary hover:bg-color-secondary text-sm"
                      onClick={() => handleClearChat(activeChatState.user)}
                    >
                      Clear Chat
                    </button>
                  </li>
                </motion.ul>
              )}
            </div>
          </header>
          <MessageList />

          {!state.img_preview ? (
            <MsgInput />
          ) : (
            <div className="flex bg-neutral-50 h-[50px] items-center justify-center">
              <button
                type="button"
                className="bg-color-primary w-[60%] text-lg rounded-md hover:bg-color-secondary ease-in transition-all py-1"
                onClick={handleSendImg}
              >
                Send
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-color-secondary grid gap-2 text-center absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[80%]">
          <div className="flex justify-self-center gap-3 items-center">
            <IoMdChatbubbles className="text-[8rem]" />
          </div>
          <h1 className="font-medium text-lg">WaysChat for Desktop</h1>
          <p>Send and receive messages using WaysChat.</p>
          <p className="text-sm font-bold">End-to-end encrypted</p>
        </div>
      )}
    </div>
  );
}

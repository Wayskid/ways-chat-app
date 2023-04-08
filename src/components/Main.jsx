import { useContext } from "react";
import MessageList from "./MessageList";
import { FiSend } from "react-icons/fi";
import { IoIosLaptop } from "react-icons/io";
import { VscArrowBoth } from "react-icons/vsc";
import { GiSmartphone } from "react-icons/gi";
import { ActiveChatContext } from "../contexts/ActiveChatContext";
import ChatAppContext from "../contexts/chatAppContext";

export default function Main() {
  const { activeChatState } = useContext(ActiveChatContext);
  const {
    handleSendMessage,
    state,
    dispatch,
    handleDeleteChat,
    handleClearChat,
  } = useContext(ChatAppContext);

  return (
    <div className="Main w-[calc(100%-280px)] border-l-txt-color border-l-[1px] relative bg-color-secondary">
      {activeChatState.chatId !== "null" ? (
        <>
          <header className="mainHeader flex  gap-3 items-center bg-color-secondary text-neutral-50 h-[60px] px-[10px]">
            <div className="avatar">
              <div className="w-[24px] rounded-xl">
                <img src={activeChatState.user.photoURL} alt="Contact Avatar" />
              </div>
            </div>
            <h3 className="contactNameHead font-medium text-xl">
              {activeChatState.user.displayName}
            </h3>
            <div className="dropdown dropdown-end ml-auto">
              <label
                tabIndex={0}
                className="btn m-1 bg-transparent border-none hover:bg-transparent"
              >
                <div className="burger grid gap-1">
                  <div className="h-[5px] w-[5px] bg-txt-color rounded-full"></div>
                  <div className="h-[5px] w-[5px] bg-txt-color rounded-full"></div>
                  <div className="h-[5px] w-[5px] bg-txt-color rounded-full"></div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow bg-color-primary rounded-md w-[6rem]"
              >
                <li>
                  <button
                    className="p-2 active:bg-color-secondary hover:bg-color-secondary text-sm"
                    onClick={() => handleDeleteChat(activeChatState.user)}
                  >
                    Delete Contact
                  </button>
                </li>
                <li>
                  <button
                    className="p-2 active:bg-color-secondary hover:bg-color-secondary text-sm"
                    onClick={() => handleClearChat(activeChatState.user)}
                  >
                    Clear Chat
                  </button>
                </li>
              </ul>
            </div>
          </header>
          <MessageList />
          <form
            className="bg-neutral-50 h-[50px] px-[10px] flex justify-center items-center"
            onSubmit={handleSendMessage}
          >
            <div className="w-[95%] flex gap-2">
              <input
                required
                type="text"
                placeholder="Type a message"
                className="w-[100%] bg-transparent outline-none text-lg text-color-secondary placeholder:text-color-secondary"
                value={state.messageVal}
                onChange={(e) =>
                  dispatch({ type: "MESSAGE_VAL", payload: e.target.value })
                }
              />
              <button>
                <FiSend className="text-xl text-color-secondary" />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="bg-color-secondary grid gap-2 text-center absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[80%]">
          <div className="flex justify-self-center gap-3 items-center">
            <IoIosLaptop className="text-[7rem] rotate-6" />
            <VscArrowBoth className="text-[2.5rem]" />
            <GiSmartphone className="text-[5rem] -rotate-6" />
          </div>
          <h1>WaysChat for Desktop</h1>
          <p className="">
            Send and receive messages using WaysChat. Use WaysChat on desktop
            and mobile devices.
          </p>
          <p className="">End-to-end encrypted</p>
        </div>
      )}
    </div>
  );
}

import { useContext } from "react";
import MessageList from "./MessageList";
import { FiSend } from "react-icons/fi";
import { ActiveChatContext } from "../contexts/ActiveChatContext";
import ChatAppContext from "../contexts/ChatAppContext";

export default function Main() {
  const { activeChatState } = useContext(ActiveChatContext);
  const { handleSendMessage, state, dispatch } = useContext(ChatAppContext);

  // console.log(activeChatState.chatId);

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
                  <a className="p-2 active:bg-color-secondary hover:bg-color-secondary text-sm">
                    Delete Contact
                  </a>
                </li>
                <li>
                  <a className="p-2 active:bg-color-secondary hover:bg-color-secondary text-sm">
                    Clear Chat
                  </a>
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
          <div className="flex justify-self-center gap-3">
            <img
              src="https://cdn-user-icons.flaticon.com/95998/95998105/1680791239355.svg?token=exp=1680792145~hmac=b1e60eec6a50d1afb83efaa6d8346f10"
              alt="Laptop"
              className="w-[100px] rotate-6"
            />
            <img
              src="https://cdn-user-icons.flaticon.com/95998/95998105/1680791394748.svg?token=exp=1680792302~hmac=0d981ea2708e2f4896c43918f43b1980"
              alt="Arrow"
              className="w-[40px]"
            />
            <img
              src="https://cdn-user-icons.flaticon.com/95998/95998105/1680791178151.svg?token=exp=1680792077~hmac=75d3ec93bce4e3d62202e724e79b0d0d"
              alt="Phone"
              className="w-[60px] -rotate-6"
            />
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

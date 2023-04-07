import { createContext, useContext, useReducer } from "react";
import AuthContext from "./AuthContext";

export const ActiveChatContext = createContext();

export default function ActiveChatProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const InitialState = {
    chatId: "null",
    user: {},
  };

  function ActiveChatReducer(state, action) {
    switch (action.type) {
      case "CHANGE_ACTIVE_CHAT":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(ActiveChatReducer, InitialState);

  function handleActiveChat(user) {
    dispatch({ type: "CHANGE_ACTIVE_CHAT", payload: user });
  }

  return (
    <ActiveChatContext.Provider
      value={{
        activeChatState: state,
        activeChatDispatch: dispatch,
        handleActiveChat,
      }}
    >
      {children}
    </ActiveChatContext.Provider>
  );
}

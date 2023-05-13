import { signOut } from "firebase/auth";
import { useContext } from "react";
import { auth } from "../firebase";
import ContactList from "./ContactList";
import Search from "./Search";
import AuthContext from "../contexts/AuthContext";
import { ActiveChatContext } from "../contexts/ActiveChatContext";
import ChatAppContext from "../contexts/ChatAppContext";

export default function Aside() {
  const { currentUser } = useContext(AuthContext);
  const { activeChatDispatch } = useContext(ActiveChatContext);
  const { state } = useContext(ChatAppContext);

  return (
    <div
      className={`aside w-[280px] text-text-color ${
        state.showAside && "showAside"
      }`}
    >
      <header className="flex justify-between items-center bg-color-primary h-[60px] px-[10px]">
        <h3 className="text-xl">WaysChat</h3>
        <div className="userSet flex items-center gap-2">
          <div className="avatar">
            <div className="w-[24px] rounded-xl">
              <img src={currentUser.photoURL} alt="User Avatar" />
            </div>
          </div>
          <p className="text-sm font-medium">
            {currentUser.displayName.slice(0, 8)}
            {currentUser.displayName.length > 8 && "..."}
          </p>
          <button
            className="bg-color-secondary p-1 text-xs rounded-md"
            onClick={() => {
              signOut(auth);
              activeChatDispatch({ type: "DELETE_ACTIVE_CHAT" });
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <Search />
      <ContactList />
    </div>
  );
}

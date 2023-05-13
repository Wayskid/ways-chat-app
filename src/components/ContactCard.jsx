import { useContext } from "react";
import { ActiveChatContext } from "../contexts/ActiveChatContext";
import moment from "moment";
import { BsImage } from "react-icons/bs";
import ChatAppContext from "../contexts/ChatAppContext";

export default function ContactCard({ contactDet }) {
  const { handleActiveChat, activeChatState } = useContext(ActiveChatContext);
  const { showHide } = useContext(ChatAppContext);

  return (
    <li
      className={`contactCard flex items-center justify-between py-3 gap-2 cursor-pointer hover:bg-color-secondary ease-in transition-all ${
        contactDet.userInfo.uid === activeChatState.user.uid &&
        "bg-color-secondary"
      } rounded-md`}
      onClick={() => {
        handleActiveChat(contactDet.userInfo);
        showHide();
      }}
    >
      <div className="avatar w-[20%] flex justify-center">
        <div className="w-[40px] rounded-full flex">
          <img
            src={contactDet.userInfo.photoURL}
            alt=""
            className="userPic self-center"
          />
        </div>
      </div>
      <div className="grid w-[70%]">
        <p className="text-xl font-medium">
          {contactDet.userInfo.displayName.slice(0, 8)}
          {contactDet.userInfo.displayName.length > 8 && "..."}
        </p>
        <p className="lastMessage text-sm flex gap-1">
          {contactDet.lastMsg?.isImage && <BsImage className="text-lg" />}
          {contactDet.lastMsg?.text.slice(0, 23)}
          {contactDet.lastMsg?.text.length > 23 && "..."}
        </p>
      </div>
      <p className="lastTime text-xs">
        {moment(contactDet.date?.toDate()).format("LT")}
      </p>
    </li>
  );
}

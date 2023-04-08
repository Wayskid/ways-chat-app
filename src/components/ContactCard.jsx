import { useContext } from "react";
import { ActiveChatContext } from "../contexts/ActiveChatContext";
import moment from "moment";

export default function ContactCard({ contactDet }) {
  const { handleActiveChat, activeChatState } = useContext(ActiveChatContext);

  return (
    <li
      className={`contactCard flex items-center justify-between py-3 gap-2 cursor-pointer hover:bg-color-secondary ease-in transition-all ${
        contactDet.userInfo.uid === activeChatState.user.uid &&
        "bg-color-secondary"
      } rounded-md`}
      onClick={() => handleActiveChat(contactDet.userInfo)}
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
      <div className="grid w-[60%]">
        <p className="text-xl font-medium">{contactDet.userInfo.displayName}</p>
        <p className="lastMessage text-sm">
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

import { useContext } from "react";
import MsgLine from "./MsgLine";
import ChatAppContext from "../contexts/ChatAppContext";

export default function MessageList() {
  const { state } = useContext(ChatAppContext);

  return (
    <ul className="messageList h-[calc(100%-110px)] grid gap-4 content-start py-4 overflow-auto bg-neutral-200">
      {state.message_list?.map((message) => {
        return <MsgLine message={message} key={message.id} />;
      })}
    </ul>
  );
}

import { useContext } from "react";
import MsgLine from "./MsgLine";
import ChatAppContext from "../contexts/ChatAppContext";
import { AiFillCloseCircle } from "react-icons/ai";

export default function MessageList() {
  const { state, handleCancelImage, handleCloseViewImage, handleViewImage } =
    useContext(ChatAppContext);

  return (
    <ul className="messageList h-[calc(100%-110px)] grid gap-4 content-start py-4 overflow-auto bg-neutral-200">
      {state.message_list?.map((message) => {
        return <MsgLine message={message} key={message.id} />;
      })}
      {state.img_preview && (
        <div className="absolute top-0 flex bg-color-primary h-[calc(100%-50px)] w-[100%] bg-opacity-60">
          <div className="self-end px-7 pb-2 flex ">
            <img src={state.img_preview} alt="preview" />
            <button type="button" onClick={handleCancelImage}>
              <AiFillCloseCircle className="top-1 right-1 text-3xl text-color-secondary" />
            </button>
          </div>
        </div>
      )}
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={state.view_img}
        onChange={handleViewImage}
      />
      <div className="modal">
        <div className="modal-box relative bg-color-primary rounded-md grid gap-2">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer"
            onClick={handleCloseViewImage}
          >
            ✕
          </button>
          <img
            src={state.clicked_img}
            alt="sent pic"
            className="h-[100%] w-[100%]"
          />
          <a
            href={state.clicked_img}
            target="_blank"
            download="WaysChatImage"
            className="w-[100%]"
          >
            <button
              type="button"
              className="bg-color-secondary text-lg rounded-md ease-in transition-all py-1 w-[100%]"
            >
              Save Image
            </button>
          </a>
        </div>
      </div>
    </ul>
  );
}

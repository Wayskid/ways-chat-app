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
        <div className="absolute top-0 flex bg-color-primary h-[calc(100%-50px)] w-[100%] bg-opacity-60 justify-center">
          <div className="flex px-2 pt-5">
            <img
              src={state.img_preview}
              alt="preview"
              className=" max-w-[100%] h-[auto] object-contain"
            />
            <button type="button" onClick={handleCancelImage}>
              <AiFillCloseCircle className="absolute top-1 right-1 text-3xl text-[white]" />
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
        <div className="modal-box relative bg-color-primary rounded-md grid gap-2 max-w-[55rem]">
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
        </div>
      </div>
      {state.loader && (
        <div className="wrapper absolute grid items-center w-[100%] h-[100%] justify-items-center top-0">
          <div className="flex items-center justify-center ">
            <div className="w-[8rem] h-[8rem] border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </ul>
  );
}

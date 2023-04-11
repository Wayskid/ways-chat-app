import { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";
import { FiSend } from "react-icons/fi";
import { BsImageFill } from "react-icons/bs";

export default function MsgInput() {
  const { handlePreviewImg, handleSendMessage, state, dispatch } =
    useContext(ChatAppContext);
  return (
    <form
      className="bg-neutral-50 h-[50px] px-[10px] flex justify-center items-center gap-2"
      onSubmit={handleSendMessage}
    >
      <input
        id="addImg"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        className="hidden"
        onChange={handlePreviewImg}
      />
      <label
        htmlFor="addImg"
        className="text-xl text-color-secondary flex cursor-pointer"
      >
        <BsImageFill className="inline" />
      </label>
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
  );
}

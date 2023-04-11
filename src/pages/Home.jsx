import { useContext } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";
import ChatAppContext from "../contexts/ChatAppContext";

export default function Home() {
  const { state } = useContext(ChatAppContext);

  return (
    <div className="home w-home-width h-home-height rounded-lg text-txt-color relative flex overflow-hidden">
      <Aside />
      <Main />
      {state.loader && (
        <div className="wrapper absolute grid items-center w-[100%] h-[100%] justify-items-center top-0">
          <div className="flex items-center justify-center ">
            <div className="w-[8rem] h-[8rem] border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
}

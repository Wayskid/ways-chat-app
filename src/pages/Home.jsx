import { useContext } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";
import ChatAppContext from "../contexts/ChatAppContext";
import AuthContext from "../contexts/AuthContext";
import { motion } from "framer-motion";

export default function Home() {
  const { state } = useContext(ChatAppContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {/* LOADER */}
      {state.loader && (
        <div className="wrapper absolute grid items-center w-[100%] h-[100%] justify-items-center top-0">
          <div className="flex items-center justify-center ">
            <div className="w-[8rem] h-[8rem] border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* HOME */}
      {currentUser?.email ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="home w-home-width h-home-height rounded-lg text-txt-color relative flex overflow-hidden shadow-xl"
        >
          <Aside />
          <Main />
        </motion.div>
      ) : (
        <div className="wrapper absolute grid items-center w-[100%] h-[100%] justify-items-center top-0">
          <div className="flex items-center justify-center ">
            <div className="w-[8rem] h-[8rem] border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
}

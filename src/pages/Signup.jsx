import { Link } from "react-router-dom";
import { ImFilePicture } from "react-icons/im";
import { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";
import { motion } from "framer-motion";

export default function Signup() {
  const { handleSignup, state, dispatch } = useContext(ChatAppContext);

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="signup w-signup-width h-signup-height bg-color-primary grid justify-items-center content-center rounded-lg text-txt-color"
      onSubmit={handleSignup}
      autoComplete="off"
    >
      <div className="inputsContainer w-[70%] grid rounded-lg gap-4">
        <h1 className="text-2xl text-center font-bold">WaysChat</h1>
        <label>
          <input
            required
            type="text"
            name="signupDName"
            placeholder="Nickname"
            className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color"
            value={state.signupInputs.signupDName}
            onChange={(e) =>
              dispatch({
                type: "SIGNUP",
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </label>
        <label>
          <input
            required
            type="email"
            name="signupEmail"
            placeholder="Email"
            className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color"
            value={state.signupInputs.signupEmail}
            onChange={(e) =>
              dispatch({
                type: "SIGNUP",
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </label>
        <label>
          <input
            required
            type="password"
            name="signupPass"
            placeholder="Password"
            className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color"
            value={state.signupInputs.signupPass}
            onChange={(e) =>
              dispatch({
                type: "SIGNUP",
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </label>
        <input
          id="userAvatar"
          type="File"
          name="avatar"
          style={{ display: "none" }}
          onChange={(e) =>
            dispatch({
              type: "USER_AVATAR",
              payload: e.target.files[0],
            })
          }
          accept="image/png, image/gif, image/jpeg"
        />
        <label
          htmlFor="userAvatar"
          className="flex gap-2 items-center font-semibold justify-self-center cursor-pointer"
        >
          <ImFilePicture /> Upload Avatar
        </label>
        <button
          type="submit"
          className="h-[2.5rem] bg-color-secondary enabled:hover:bg-[#1a6ba9] ease-in transition-all rounded-lg disabled:opacity-50"
          disabled={
            state.signupInputs.signupDName.length &&
            state.signupInputs.signupEmail.length &&
            state.signupInputs.signupPass.length &&
            state.user_avatar
              ? false
              : true
          }
        >
          Sign Up
        </button>
        {state.signup_err && (
          <p className="text-center font-medium text-sm text-[#e52f2f]">
            Looks like you already have an account
          </p>
        )}
        <button className="text-sm">
          Already have an account?
          <Link to="/Login" className="text-[#4c8bf5] font-medium">
            Login
          </Link>
        </button>
      </div>
      {state.loader && (
        <div className="wrapper absolute grid items-center w-[100%] h-[100%] justify-items-center top-0">
          <div className="flex items-center justify-center ">
            <div className="w-[8rem] h-[8rem] border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </motion.form>
  );
}

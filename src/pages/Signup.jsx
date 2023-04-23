import { Link } from "react-router-dom";
import { ImFilePicture } from "react-icons/im";
import { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";
import { motion } from "framer-motion";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";

export default function Signup() {
  const { handleSignup, state, dispatch } = useContext(ChatAppContext);

  return (
    <form
      className="signup bg-color-primary grid justify-items-center text-txt-color h-[100%] w-[100vw] pb-7"
      onSubmit={handleSignup}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="grid w-[80%] h-[70%] justify-items-center gap-10 self-center grid-rows-[0.5fr_1fr_3fr]"
      >
        <h1 className="text-2xl text-center font-bold mb-5 text-color-msg">
          WaysChat
        </h1>
        <div className="md:w-[25%] rounded-lg">
          <p className="text-4xl text-center font-medium">Sign Up</p>
          <p className="text-md text-center">Sign up to WaysChat</p>
        </div>
        <div className="inputsContainer grid gap-7 w-[min(25rem,100%)]">
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
              value={state.signupInputs.signupEmail}
              className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color"
              onChange={(e) =>
                dispatch({
                  type: "SIGNUP",
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </label>

          <label className="relative">
            <input
              required
              type={state.isPassShown ? "text" : "password"}
              name="signupPass"
              placeholder="Password"
              value={state.signupInputs.signupPass}
              className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color pr-7 text-lg"
              onChange={(e) =>
                dispatch({
                  type: "SIGNUP",
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            <button
              className="mt-2 text-sm flex items-center gap-1 ml-2 absolute top-0 right-1"
              type="button"
              onClick={() => dispatch({ type: "SHOW_PASS" })}
              name="Show Password"
            >
              {state.isPassShown ? (
                <RiEyeLine className="text-xl" />
              ) : (
                <RiEyeCloseLine className="text-xl" />
              )}
            </button>
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
              state.signupInputs.signupDName &&
              state.signupInputs.signupEmail &&
              state.signupInputs.signupPass &&
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
            Already have an account?{" "}
            <Link to="/Login" className="text-[#bed3f7] font-medium">
              Login
            </Link>
          </button>
        </div>
      </motion.div>
      {state.loader && (
        <div className="wrapper absolute grid items-center w-[100%] h-[100%] justify-items-center top-0">
          <div className="flex items-center justify-center ">
            <div className="w-[8rem] h-[8rem] border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </form>
  );
}

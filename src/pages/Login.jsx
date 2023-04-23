import { Link } from "react-router-dom";
import { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";
import { motion } from "framer-motion";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";

export default function Login() {
  const { handleLogin, dispatch, state } = useContext(ChatAppContext);

  return (
    <form
      className="signup bg-color-primary grid justify-items-center text-txt-color h-[100%] w-[100vw] pb-7"
      onSubmit={handleLogin}
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
          <p className="text-4xl text-center font-medium">Sign In</p>
          <p className="text-md text-center">
            Sign in using your WaysChat Account
          </p>
        </div>
        <div className="inputsContainer grid gap-7 w-[min(25rem,100%)]">
          <label>
            <input
              required
              type="email"
              name="loginEmail"
              placeholder="Email"
              className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color text-lg"
              onChange={(e) =>
                dispatch({
                  type: "LOGIN",
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
              name="loginPass"
              placeholder="Password"
              className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color pr-7 text-lg"
              onChange={(e) =>
                dispatch({
                  type: "LOGIN",
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
          <button
            type="submit"
            className="h-[2.5rem] bg-color-secondary enabled:hover:bg-[#1a6ba9] ease-in transition-all rounded-lg disabled:opacity-50"
            disabled={
              state.loginInputs.loginEmail && state.loginInputs.loginPass
                ? false
                : true
            }
          >
            Sign In
          </button>
          {state.loginError && (
            <p className="text-center font-medium text-sm text-[#e52f2f]">
              Email or Password is wrong
            </p>
          )}
          <button className="text-sm">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-[#bed3f7] font-medium">
              Sign Up
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

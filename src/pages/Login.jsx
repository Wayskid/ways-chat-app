import { Link } from "react-router-dom";
import { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";
import { motion } from "framer-motion";

export default function Login() {
  const { handleLogin, dispatch, state } = useContext(ChatAppContext);

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
      onSubmit={handleLogin}
    >
      <div className="inputsContainer w-[70%] grid rounded-lg gap-6">
        <h1 className="text-3xl text-center font-bold mb-5">WaysChat</h1>
        <label>
          <input
            required
            type="email"
            name="loginEmail"
            placeholder="Email"
            className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color"
            onChange={(e) =>
              dispatch({
                type: "LOGIN",
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
            name="loginPass"
            placeholder="Password"
            className="w-[100%] rounded-md bg-transparent border-[1px] border-transparent border-b-[1px] border-b-txt-color outline-none focus:border-txt-color px-2 py-1 focus:placeholder-transparent placeholder:text-txt-color text-txt-color"
            onChange={(e) =>
              dispatch({
                type: "LOGIN",
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </label>
        <button
          type="submit"
          className="h-[2.5rem] bg-color-secondary enabled:hover:bg-[#1a6ba9] ease-in transition-all rounded-lg disabled:opacity-50"
          disabled={
            state.loginInputs.loginEmail.length &&
            state.loginInputs.loginPass.length
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
          <Link to="/Signup" className="text-[#4c8bf5] font-medium">
            Sign Up
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

import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";

export default function Login() {
  const { handleLogin, dispatch, state } = useContext(ChatAppContext);

  return (
    <form
      className="signup w-signup-width h-signup-height bg-color-primary grid justify-items-center content-center rounded-lg text-txt-color"
      onSubmit={handleLogin}
    >
      <div className="inputsContainer w-[70%] grid rounded-lg gap-4">
        <h1 className="text-2xl text-center font-bold">WaysChat</h1>
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
          className="h-[2.5rem] bg-color-secondary hover:bg-[#1a6ba9] ease-in transition-all rounded-lg"
        >
          Sign In
        </button>
        {state.loginError && (
          <p className="text-center font-medium text-xs">
            Email or Password is wrong
          </p>
        )}
        <p className="text-center font-medium text-sm">OR</p>
        <button
          type="submit"
          className="flex text-[white] rounded-md justify-self-center bg-[#4c8bf5] items-center pl-[2px] pr-[0.5rem] h-[30px] gap-2 font-semibold text-sm"
        >
          <FcGoogle className="bg-neutral-50 h-[85%] w-[27px] rounded-md" />
          Sign In with Google
        </button>
        <button className="text-xs">
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
    </form>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-color-primary h-[100vh] w-[100vw] grid justify-center content-center">
      <div className=" text-txt-color grid pb-10">
        <Link to="/" className="text-center text-[4rem] font-bold">
          WaysChat
        </Link>
        <h1 className="font-bold text-8xl text-center">404</h1>
        <p className="font-semi-bold text-xl text-center">Page Not Found</p>
        <Link to="/" className=" text-[#f4bdf4] justify-self-center">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

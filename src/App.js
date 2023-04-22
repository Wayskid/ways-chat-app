import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import ActiveChatProvider from "./contexts/ActiveChatContext";
import { ChatAppProvider } from "./contexts/ChatAppContext";
// import UserRoute from "./pages/UserRoute";

export default function App() {
  return (
    <ActiveChatProvider>
      <ChatAppProvider>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
        </Routes>
      </ChatAppProvider>
    </ActiveChatProvider>
  );
}

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function UserRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/Home" />;
  }
  return children;
}

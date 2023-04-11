import ContactCard from "./ContactCard";
import { useContext, useEffect } from "react";
import ChatAppContext from "../contexts/ChatAppContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "../contexts/AuthContext";

export default function ContactList() {
  const { state, handleSelect, dispatch } = useContext(ChatAppContext);
  const { currentUser } = useContext(AuthContext);

  //GET USER CONTACT LIST
  useEffect(() => {
    function getContactList() {
      const unSub = onSnapshot(
        doc(db, "userContactList", currentUser?.uid),
        (doc) => {
          dispatch({
            type: "CONTACT_LIST",
            payload: Object.entries(doc.data()),
          });
        }
      );

      return () => {
        unSub();
      };
    }

    currentUser.uid && getContactList();
  }, [currentUser.uid, dispatch]);

  return (
    <ul className="contactList pt-[10px] grid overflow-auto px-[7px] align-top gap-2 h-[calc(100%-105px)] content-baseline bg-color-primary">
      {state.search_result && (
        <li
          className="searchCard flex py-3 gap-4 items-center px-[10px] border-b-[1px] w-[100%] hover:bg-color-secondary cursor-pointer rounded-md"
          onClick={handleSelect}
        >
          <div className="avatar">
            <div className="w-[40px] rounded-full flex">
              <img
                src={state.search_result.photoURL}
                alt="searched avatar"
                className="userPic self-center"
              />
            </div>
          </div>
          <div className="grid w-[60%] justify-self-start">
            <p className="text-xl font-medium">
              {state.search_result.displayName}
            </p>
            <p className="text-sm font-medium">{state.search_result.email}</p>
          </div>
        </li>
      )}
      {state.search_err && (
        <p className="text-center font-medium text-xs">User not found</p>
      )}

      {state.contact_list
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((contact) => {
          return <ContactCard key={contact[0]} contactDet={contact[1]} />;
        })}
    </ul>
  );
}

import { createContext, useContext, useEffect, useReducer } from "react";
import { ChatAppReducer, InitialState } from "../reducers/ChatAppReducer";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { ActiveChatContext } from "./ActiveChatContext";
import uuid from "react-uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const ChatAppContext = createContext();

export function ChatAppProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const { activeChatState } = useContext(ActiveChatContext);
  const [state, dispatch] = useReducer(ChatAppReducer, InitialState);

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const displayName = state.signupInputs.signupDName;
    const email = state.signupInputs.signupEmail;
    const password = state.signupInputs.signupPass;
    const imgFile = state.user_avatar;
    dispatch({ type: "LOADER", payload: true });

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgRef = ref(storage, `usersAvatar/${res.user.uid}`);

      const uploadTask = await uploadBytes(imgRef, imgFile);
      const photoURL = await getDownloadURL(imgRef);

      await updateProfile(res.user, {
        displayName,
        photoURL,
      })
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log("Failed");
        });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      dispatch({ type: "SIGNUP_ERROR", payload: false });
      dispatch({ type: "LOADER", payload: false });

      navigate("/");
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR", payload: true });
      dispatch({ type: "LOADER", payload: false });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const email = state.loginInputs.loginEmail;
    const password = state.loginInputs.loginPass;
    dispatch({ type: "LOADER", payload: true });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      dispatch({ type: "LOADER", payload: false });
      dispatch({ type: "LOGIN_ERROR", payload: false });
    } catch (error) {
      dispatch({ type: "LOADER", payload: false });
      dispatch({ type: "LOGIN_ERROR", payload: true });
    }
  }

  async function handleSearch(search_value) {
    dispatch({ type: "SEARCH_VAL", payload: search_value });

    const q = query(
      collection(db, "users"),
      where("email", "==", search_value)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch({ type: "SEARCH_RESULT", payload: doc.data() });
      });
    } catch (error) {
      dispatch({ type: "SEARCH_ERROR", payload: true });
    }
  }

  async function handleSelect() {
    const user = state.search_result;
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    if (state.search_result.email !== currentUser.email) {
      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (error) {}
    }
    dispatch({ type: "SEARCH_RESULT", payload: null });
    dispatch({ type: "SEARCH_VAL", payload: "" });
  }

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", activeChatState.chatId),
      (doc) => {
        doc.exists() &&
          dispatch({ type: "MESSAGE_LIST", payload: doc.data().messages });
      }
    );

    return () => {
      unSub();
    };
  }, [activeChatState.chatId]);

  async function handleSendMessage(e) {
    e.preventDefault();

    await updateDoc(doc(db, "chats", activeChatState.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: state.messageVal,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [activeChatState.chatId + ".lastMsg"]: {
        text: state.messageVal,
      },
      [activeChatState.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", activeChatState.user.uid), {
      [activeChatState.chatId + ".lastMsg"]: {
        text: state.messageVal,
      },
      [activeChatState.chatId + ".date"]: serverTimestamp(),
    });

    dispatch({ type: "MESSAGE_VAL", payload: "" });
  }

  return (
    <ChatAppContext.Provider
      value={{
        state,
        InitialState,
        handleSignup,
        handleLogin,
        dispatch,
        handleSearch,
        handleSelect,
        handleSendMessage,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
}

export default ChatAppContext;

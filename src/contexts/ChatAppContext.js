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
  arrayUnion,
  Timestamp,
  deleteField,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { ActiveChatContext } from "./ActiveChatContext";
import uuid from "react-uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const ChatAppContext = createContext();

export function ChatAppProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const { activeChatState, activeChatDispatch } = useContext(ActiveChatContext);
  const [state, dispatch] = useReducer(ChatAppReducer, InitialState);

  const navigate = useNavigate();

  //SIGNUP
  async function handleSignup(e) {
    e.preventDefault();
    if (
      state.signupInputs.signupEmail.length &&
      state.signupInputs.signupDName.length &&
      state.signupInputs.signupPass.length &&
      state.user_avatar
    ) {
      const displayName = state.signupInputs.signupDName;
      const email = state.signupInputs.signupEmail;
      const password = state.signupInputs.signupPass;
      const imgFile = state.user_avatar;
      dispatch({ type: "LOADER", payload: true });

      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const imgRef = ref(storage, `usersAvatar/${res.user.uid}`);

        await uploadBytes(imgRef, imgFile);
        const photoURL = await getDownloadURL(imgRef);

        await updateProfile(res.user, {
          displayName,
          photoURL,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL,
        });

        await setDoc(doc(db, "userContactList", res.user.uid), {});

        dispatch({ type: "SIGNUP_ERROR", payload: false });
        dispatch({ type: "LOADER", payload: false });

        navigate("/");
      } catch (error) {
        dispatch({ type: "SIGNUP_ERROR", payload: true });
        dispatch({ type: "LOADER", payload: false });
      }
    }
  }

  //LOGIN
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

  //SEARCH AND ADD USER
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

  //Close search
  function closeSearch() {
    dispatch({ type: "SEARCH_RESULT", payload: null });
    dispatch({ type: "SEARCH_VAL", payload: "" });
  }

  //SELECT USER AND ADD TO CONTACT LIST
  async function handleSelect() {
    const user = state.search_result;
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    dispatch({ type: "LOADER", payload: true });
    dispatch({ type: "SEARCH_RESULT", payload: null });
    dispatch({ type: "SEARCH_VAL", payload: "" });

    //Check if current user search current user email
    if (state.search_result.email !== currentUser.email) {
      try {
        //Check if user is already in contactList
        const docSnap = await getDoc(
          doc(db, "userContactList", currentUser.uid)
        );

        if (Object.keys(docSnap.data()).includes(combinedId)) {
          //Already there do nothing
        } else {
          const res = await getDoc(doc(db, "chats", combinedId));

          //Check if doc exists
          if (res.exists()) {
            await updateDoc(doc(db, "chats", combinedId), {
              [currentUser.uid + ".messages"]: [],
            });
          } else {
            await setDoc(doc(db, "chats", combinedId), {
              [currentUser.uid]: [],
              [user.uid]: [],
            });
          }

          await updateDoc(doc(db, "userContactList", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userContactList", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        activeChatDispatch({ type: "CHANGE_ACTIVE_CHAT", payload: user });
        dispatch({ type: "LOADER", payload: false });
      } catch (error) {}
    } else {
      dispatch({ type: "LOADER", payload: false });
      dispatch({ type: "SHOW_MAIN" });
      dispatch({ type: "SHOW_ASIDE" });
    }
  }

  //GET USER MESSAGES
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", activeChatState.chatId),
      (doc) => {
        doc.exists() &&
          dispatch({
            type: "MESSAGE_LIST",
            payload: doc.data()[currentUser?.uid]?.messages,
          });
      }
    );

    return () => {
      unSub();
    };
  }, [activeChatState.chatId, currentUser?.uid, dispatch]);

  //SEND A MESSAGE
  async function handleSendMessage(e) {
    e.preventDefault();

    dispatch({ type: "MESSAGE_VAL", payload: "" });

    await updateDoc(doc(db, "chats", activeChatState.chatId), {
      [currentUser.uid + ".messages"]: arrayUnion({
        id: uuid(),
        text: state.messageVal,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
      [activeChatState.user.uid + ".messages"]: arrayUnion({
        id: uuid(),
        text: state.messageVal,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userContactList", currentUser.uid), {
      [activeChatState.chatId + ".lastMsg"]: {
        text: state.messageVal,
      },
      [activeChatState.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userContactList", activeChatState.user.uid), {
      [activeChatState.chatId + ".lastMsg"]: {
        text: state.messageVal,
      },
      [activeChatState.chatId + ".date"]: serverTimestamp(),
    });
  }

  //IMAGE PREVIEW
  async function handlePreviewImg(e) {
    dispatch({ type: "IMG_SENT", payload: e.target.files[0] });
    dispatch({ type: "LOADER", payload: true });

    if (e.target.files[0]) {
      const imgRef = ref(storage, `imgPreview/${uuid()}`);

      await uploadBytes(imgRef, e.target.files[0]);
      const downloadURL = await getDownloadURL(imgRef);
      dispatch({ type: "IMG_PREVIEW", payload: downloadURL });
      dispatch({ type: "IMG_PREVIEW_REF", payload: imgRef });
    }

    dispatch({ type: "LOADER", payload: false });
  }

  //CANCEL SEND IMAGE
  function handleCancelImage() {
    dispatch({ type: "IMG_PREVIEW", payload: null });
    dispatch({ type: "IMG_SENT", payload: null });

    // Delete the file
    deleteObject(state.img_preview_ref)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //SEND IMAGE
  async function handleSendImg() {
    dispatch({ type: "LOADER", payload: true });

    await updateDoc(doc(db, "chats", activeChatState.chatId), {
      [currentUser.uid + ".messages"]: arrayUnion({
        id: uuid(),
        image: state.img_preview,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
      [activeChatState.user.uid + ".messages"]: arrayUnion({
        id: uuid(),
        image: state.img_preview,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userContactList", currentUser.uid), {
      [activeChatState.chatId + ".lastMsg"]: {
        text: "Image",
        isImage: true,
      },
      [activeChatState.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userContactList", activeChatState.user.uid), {
      [activeChatState.chatId + ".lastMsg"]: {
        text: "Image",
        isImage: true,
      },
      [activeChatState.chatId + ".date"]: serverTimestamp(),
    });

    dispatch({ type: "LOADER", payload: false });
    dispatch({ type: "IMG_PREVIEW", payload: null });
    dispatch({ type: "IMG_SENT", payload: null });
  }

  //DELETE USER
  async function handleDeleteChat(user) {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    dispatch({ type: "LOADER", payload: true });
    dispatch({ type: "SHOW_MAIN" });
    dispatch({ type: "SHOW_ASIDE" });

    try {
      activeChatDispatch({ type: "DELETE_ACTIVE_CHAT" });

      await updateDoc(doc(db, "chats", combinedId), {
        [currentUser.uid]: [],
      });

      await updateDoc(doc(db, "userContactList", currentUser.uid), {
        [combinedId]: deleteField(),
      });

      dispatch({ type: "LOADER", payload: false });
    } catch {}
  }

  //CLEAR CHAT
  async function handleClearChat(user) {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    dispatch({ type: "LOADER", payload: true });

    try {
      await updateDoc(doc(db, "chats", combinedId), {
        [currentUser.uid]: [],
      });

      await updateDoc(doc(db, "userContactList", currentUser.uid), {
        [combinedId + ".lastMsg"]: deleteField(),
      });

      dispatch({ type: "LOADER", payload: false });
    } catch {}
  }

  //View Image
  function handleViewImage(e) {
    dispatch({ type: "VIEW_IMG", payload: true });
    dispatch({ type: "CLICKED_IMG", payload: e.target.src });
  }

  //Close view image
  function handleCloseViewImage() {
    dispatch({ type: "VIEW_IMG", payload: false });
  }

  //Mobile View
  function showHide() {
    dispatch({ type: "SHOW_MAIN" });
    dispatch({ type: "SHOW_ASIDE" });
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
        closeSearch,
        handleSelect,
        handleSendMessage,
        handleDeleteChat,
        handleClearChat,
        handlePreviewImg,
        handleCancelImage,
        handleSendImg,
        handleViewImage,
        handleCloseViewImage,
        showHide,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
}

export default ChatAppContext;

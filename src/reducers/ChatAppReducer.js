export const InitialState = {
  signupInputs: {
    signupDName: "",
    signupEmail: "",
    signupPass: "",
  },
  loginInputs: {
    loginEmail: "",
    loginPass: "",
  },
  signup_err: false,
  loginError: false,
  user_avatar: null,
  photo_url:
    "https://firebasestorage.googleapis.com/v0/b/ways-chat-app-b4b87.appspot.com/o/285655_user_icon.png?alt=media&token=3cf1e8fa-a731-461c-a370-9aca28c49a00",
  search_val: "",
  search_result: null,
  search_err: false,
  contact_list: [],
  message_list: [],
  messageVal: "",
  loader: false,
};

export function ChatAppReducer(state, action) {
  switch (action.type) {
    case "SIGNUP":
      return {
        ...state,
        signupInputs: {
          ...state.signupInputs,
          [action.field]: action.payload,
        },
      };
    case "LOGIN":
      return {
        ...state,
        loginInputs: {
          ...state.loginInputs,
          [action.field]: action.payload,
        },
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        signup_err: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    case "USER_AVATAR":
      return {
        ...state,
        user_avatar: action.payload,
      };
    case "SEARCH_VAL":
      return {
        ...state,
        search_val: action.payload,
      };
    case "SEARCH_RESULT":
      return {
        ...state,
        search_result: action.payload,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        search_err: action.payload,
      };
    case "CONTACT_LIST":
      return {
        ...state,
        contact_list: action.payload,
      };
    case "MESSAGE_LIST":
      return {
        ...state,
        message_list: action.payload,
      };
    case "MESSAGE_VAL":
      return {
        ...state,
        messageVal: action.payload,
      };
    case "LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
}

export const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { ...state, show: true, message: action.message };
    case "HIDE":
      return { ...state, show: false, message: "" };
    default:
      return state;
  }
};

export const initialtoastState = {
  show: false,
  message: "",
};

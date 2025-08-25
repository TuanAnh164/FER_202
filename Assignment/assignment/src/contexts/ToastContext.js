import React, { useReducer, createContext } from "react";
import { toastReducer, initialtoastState } from "../reducers/ToastReducer";

export const ToastContext = createContext();
export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialtoastState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

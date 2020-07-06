import React, { createContext, useCallback, useContext } from "react";

// import the toast container to be available when the hook is called
import ToastContainer from "../components/ToastContainer";

// interface for the method that we will be able to call for this hook
interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

// we create the ToastContext as the type of the interface and initiate it as an empty toast
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// the provider is the component so it can wrap other components that need to use the context/hook
const ToastProvider: React.FC = ({ children }) => {
  // callback function to add a Toast
  const addToast = useCallback(() => {
    console.log("addToast from the hook");
  }, []);

  // callback function to remove a toast
  const removeToast = useCallback(() => {}, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// this is to enable to useToast() to be called and then handle the hook functions
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast() must be used within a ToastProvider");
  }
  return context;
}

export { ToastProvider, useToast };

import { useState, createContext } from "react";

const LibraryContext = createContext("");

export const LibraryProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState("logged-out");
  const [updator, setUpdator] = useState(0);
  const [showNotification, setShowNotification] = useState({
    open: false,
    msg: "",
  });

  const updateLoggedInStatus = (status) => {
    setLoggedInStatus(status);
  };

  const updateUpdator = (updator) => {
    setUpdator(updator);
  };

  const updateShowNotification = (notificationObj) => {
    setShowNotification(notificationObj);

    setTimeout(() => {
      setShowNotification({
        open: false,
        msg: "",
      });
    }, 2000);
  };

  return (
    <LibraryContext.Provider
      value={{
        loggedInStatus,
        updateLoggedInStatus,
        updator,
        updateUpdator,
        showNotification,
        updateShowNotification,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;

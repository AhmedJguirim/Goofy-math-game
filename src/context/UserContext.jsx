import React from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);

  const updateUser = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

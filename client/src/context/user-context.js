import React from "react";

const UserContext = React.createContext({
   id: null, 
   name: null,
   isCompany: null,
   setUser: () => {}
});

export default UserContext;
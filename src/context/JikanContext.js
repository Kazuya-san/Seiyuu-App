import React, { createContext, useState } from "react";
import Jikan from "jikanjs"

export const JikanContext = createContext();

const JikanProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  //Actions
  const FetchData = async (inputText, callback) => {
    let raw = await Jikan.search("person", inputText, 1);
    let data = await raw.results;
   // console.log(data)
    callback(data.map(seiyuu => ({
      url: seiyuu.url,
      name: seiyuu.name,
      label: <div><img src={seiyuu.image_url} alt={seiyuu.name} height="40px" width="40px" className="img-thumbnail mr-3"/>{seiyuu.name}</div>,
      value: seiyuu.mal_id,
      avatar: seiyuu.image_url
    })))
  }

  const changeState = (selectedUser) => {
    setSelectedUsers(selectedUser || []);
  }

  return (
    <JikanContext.Provider value={{selectedUsers, FetchData, changeState}}>
      {children}
    </JikanContext.Provider>
  );
};

export default JikanProvider;
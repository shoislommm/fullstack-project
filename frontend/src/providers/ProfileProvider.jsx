import { useState } from "react";
import { ProfileContext } from "../context/ProfileContext";

// eslint-disable-next-line react/prop-types
export default function ProfileProvider({ children }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);

  const handleClick = () => {
    setShowProfile((prev) => !prev);
  };

  const handleMyPosts = () => {
    setShowMyPosts((prev) => !prev);
  };

  return (
    <ProfileContext.Provider
      value={{ showProfile, handleClick, showMyPosts, handleMyPosts }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

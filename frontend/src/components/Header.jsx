import { Link, useLocation } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import SearchPosts from "./SearchPosts";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Avatar } from "@mui/joy";
import { ProfileContext } from "../context/ProfileContext";

export default function Header() {
  const { handleClick } = useContext(ProfileContext);
  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/posts">
        <img
          className="logo"
          src="src/images/pngfind.com-post-it-note-png-456186.png"
        />
      </Link>
      {location.pathname === "/posts" ? <SearchPosts /> : null}

      {!user ? (
        <div className="button-parent">
          <Link to="/auth?type=login">
            <Button variant="contained">Sign in</Button>
          </Link>

          <Link to="/auth?type=register">
            <Button variant="contained">Sign up</Button>
          </Link>
        </div>
      ) : (
        <div className="button-parent">
          <b className="greeting">Welcome, {user?.name}!</b>
          <IconButton
            sx={{
              height: "40px",
              width: "40px",
            }}
            onClick={() => handleClick()}
          >
            <Avatar
              sx={{
                borderRadius: "3px",
              }}
            />
          </IconButton>
        </div>
      )}
    </header>
  );
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import SearchPosts from "./SearchPosts";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import { Avatar } from "@mui/joy";
import NewPostDetails from "./NewPostDetails";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signout } = useContext(UserContext);

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
          <Button variant="contained" onClick={() => setShowModal(true)}>
            Sign out
          </Button>
          <IconButton
            sx={{
              height: "40px",
              width: "40px",
            }}
            onClick={() => navigate("/posts/create")}
          >
            <Avatar
              sx={{
                borderRadius: "3px",
              }}
            />
          </IconButton>
        </div>
      )}
      {showModal ? (
        <Modal>
          <div>
            <h1>Are you sure you want to sign out?</h1>
            <div className="button-parent">
              <Button
                variant="contained"
                onClick={() => {
                  signout();
                  setShowModal(false);
                  navigate("/auth?type=login");
                }}
              >
                Yes
              </Button>
              <Button variant="contained" onClick={() => setShowModal(false)}>
                No
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </header>
  );
}

/* eslint-disable no-constant-condition */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import SearchPosts from "./SearchPosts";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Avatar } from "@mui/joy";
import Modal from "./Modal";
import { PostsContext } from "../context/PostsContext";
import { googleLogout } from "@react-oauth/google";

export default function Header() {
  const { user, signOut, showMyPosts } = useContext(UserContext);
  const { requestParams } = useContext(PostsContext);
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const reloadDocument = requestParams?.trim() ? true : false;

  return (
    <header className="header">
      <Link to="/posts" reloadDocument={reloadDocument}>
        <img
          className="logo"
          src="src/images/pngfind.com-post-it-note-png-456186.png"
        />
      </Link>
      {location.pathname === "/posts" || location.pathname === "/bookmarks" ? (
        <SearchPosts />
      ) : null}
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
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleUserMenu}
          >
            <Avatar
              sx={{
                borderRadius: "3px",
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                showMyPosts();
                navigate("/userPosts");
              }}
            >
              My posts
            </MenuItem>
            <MenuItem onClick={() => navigate("/posts/create")}>
              Create post
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/bookmarks");
              }}
            >
              Bookmarks
            </MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setShowModal(true);
              }}
            >
              Signout
            </MenuItem>
          </Menu>
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
                  signOut();
                  setShowModal(false);
                  navigate("/auth?type=login");
                  googleLogout();
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

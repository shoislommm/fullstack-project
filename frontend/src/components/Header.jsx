import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button } from "@mui/material";
import SearchPosts from "./SearchPosts";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const storedToken = localStorage.getItem("token");
  const type = searchParams.get("type");
  const user = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", storedToken);

  console.log(localStorage);

  console.log(token);

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
          {type !== "register" ? (
            <Link to="/auth?type=login">
              <Button variant="contained">Sign in</Button>
            </Link>
          ) : (
            <Link to="/auth?type=register">
              <Button variant="contained">Sign up</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="button-parent">
          <b className="greeting">Welcome, {user.name}!</b>
          <Button variant="contained" onClick={() => setShowModal(true)}>
            Sign out
          </Button>
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
                  setToken({});
                  setShowModal(false);
                  // navigate("/auth?type=login");
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

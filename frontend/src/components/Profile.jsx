import { Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from "./Modal";
import { ProfileContext } from "../context/ProfileContext";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const { user, signout } = useContext(UserContext);
  const { showProfile, handleMyPosts } = useContext(ProfileContext);
  const navigate = useNavigate();

  return user && showProfile ? (
    <div className="profile">
      <div>
        <Button onClick={() => navigate("/posts/create")}>Create Post</Button>
        <Button onClick={() => handleMyPosts()}>My Posts</Button>
        <Button variant="contained" onClick={() => setShowModal(true)}>
          Sign out
        </Button>
      </div>
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
    </div>
  ) : null;
}

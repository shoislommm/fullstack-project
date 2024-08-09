import toast from "react-hot-toast";

export default function pushToast(message) {
  return toast(message, {
    style: {
      margin: "5px",
      color: "black",
      backgroundColor: "white",
      border: "2px solid black",
      boxShadow: "5px 5px 5px black",
    },
  });
}

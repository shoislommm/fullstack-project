import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useSearchParams, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";
import Register from "../components/Register";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const user = useContext(UserContext);

  // if (user) {
  //   return <Navigate to="/posts" />;
  // }

  return (
    <>
      <Header />
      {type === "login" ? <Login /> : <Register />}
    </>
  );
}

import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";
import Register from "../components/Register";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      <Header />
      {type === "register" ? <Register /> : <Login />}
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Person,
  Lock,
  InfoOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Stack, Input, FormHelperText, FormControl } from "@mui/joy";
import { Button, IconButton } from "@mui/material";
import { fetchLogin } from "../fetches/fetchAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputColor, setInputColor] = useState("neutral");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleClick() {
    const response = await fetchLogin(username, password);
    if (response.success === false) {
      setError(response.message);
      setInputColor("danger");
      return;
    }

    const token = response.jwtToken;

    localStorage.setItem("token", token);

    navigate("/posts");

    return;
  }

  return (
    <div className="auth">
      <Stack>
        <Input
          sx={{
            height: "60px",
          }}
          variant="soft"
          type="text"
          placeholder="Username"
          startDecorator={<Person />}
          value={username}
          color={inputColor}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Stack>
      <br />
      <Stack>
        <Input
          sx={{
            height: "60px",
          }}
          variant="soft"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          color={inputColor}
          onChange={(event) => setPassword(event.target.value)}
          startDecorator={<Lock />}
          endDecorator={
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </Stack>
      <br />
      {error && (
        <FormControl color={inputColor}>
          <FormHelperText>
            <InfoOutlined />
            {error}
          </FormHelperText>
        </FormControl>
      )}
      <br />
      <Button
        variant="contained"
        style={{
          height: "60px",
        }}
        onClick={() => handleClick()}
      >
        Login
      </Button>
    </div>
  );
}

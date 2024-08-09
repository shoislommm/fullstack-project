import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Person,
  Lock,
  ErrorOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Stack, Input, FormHelperText, FormControl } from "@mui/joy";
import { Button, IconButton } from "@mui/material";
import { fetchLogin } from "../fetches/fetchAuth";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputColor, setInputColor] = useState("neutral");
  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleClick() {
    try {
      const response = await fetchLogin(username, password);
      if (response.success === false) {
        setError(response.message);
        setInputColor("danger");
        return;
      }

      const token = response.jwtToken;

      signin(token);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
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
            <ErrorOutline className="error-svg" sx={{ paddingRight: "10px" }} />
            {error}
          </FormHelperText>
        </FormControl>
      )}
      <br />
      <Button
        className="details-button"
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

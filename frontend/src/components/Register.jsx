import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { ErrorOutline } from "@mui/icons-material";
import {
  Stack,
  Input,
  Typography,
  LinearProgress,
  FormHelperText,
  FormControl,
} from "@mui/joy";
import { fetchRegister } from "../fetches/fetchAuth";

export default function Register() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputColor, setInputColor] = useState("neutral");
  const navigate = useNavigate();
  const minLength = 12;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleClick() {
    const response = await fetchRegister(username, password);

    if (password.trim() !== confirmPassword.trim()) {
      setError("The password confirmation does not match!");
      setInputColor("danger");
      console.log(error);
      return;
    }

    if (response?.success === false) {
      setError(response.message);
      setInputColor("danger");
      console.log(error);
      return;
    }

    navigate("/auth?type=login");
    return;
  }

  return (
    <div className="auth">
      <Stack
        spacing={0.5}
        sx={{
          "--hue": Math.min(username.length * 10, 120),
        }}
      >
        <Input
          sx={{
            height: "60px",
          }}
          color={inputColor}
          variant="soft"
          type="text"
          placeholder="Username"
          startDecorator={<Person />}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Stack>
      <br />
      <Stack
        spacing={0.5}
        sx={{
          "--hue": Math.min(password.length * 10, 120),
        }}
      >
        <Input
          sx={{
            height: "60px",
          }}
          variant="soft"
          color={inputColor}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          startDecorator={<Lock />}
          endDecorator={
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
        <br />
        {error && (
          <FormControl color={inputColor}>
            <FormHelperText>
              <ErrorOutline
                className="error-svg"
                sx={{ paddingRight: "10px" }}
              />
              {error}
            </FormHelperText>
          </FormControl>
        )}
        <br />
        <Input
          sx={{
            height: "60px",
          }}
          variant="soft"
          color={inputColor}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          startDecorator={<Lock />}
          endDecorator={
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
        <LinearProgress
          determinate
          size="sm"
          value={Math.min((password.length * 100) / minLength, 100)}
          sx={{
            bgcolor: "background.level3",
            color: "hsl(var(--hue) 80% 40%)",
          }}
        />
        <Typography
          level="body-xs"
          sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
        >
          {password.length < 3 && "Very weak"}
          {password.length >= 3 && password.length < 6 && "Weak"}
          {password.length >= 6 && password.length < 10 && "Strong"}
          {password.length >= 10 && "Very strong"}
        </Typography>
      </Stack>
      <br />
      <Button
        className="details-button"
        variant="contained"
        style={{
          height: "60px",
        }}
        onClick={() => handleClick()}
      >
        Register
      </Button>
    </div>
  );
}

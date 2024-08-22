import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { ErrorOutline } from "@mui/icons-material";
import {
  Stack,
  Input,
  Typography,
  LinearProgress,
  FormHelperText,
  FormControl,
} from "@mui/joy";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [inputColor, setInputColor] = useState("neutral");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const minLength = 12;

  const handleClickShowPassword = () => setShowNewPassword((show) => !show);

  async function handleSubmit() {
    const response = await fetchRegister(currentPassword, newPassword);

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      setError("The newPassword confirmation does not match!");
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

    navigate("/posts");
    return;
  }

  return (
    <div className="auth">
      <Stack
        spacing={3}
        sx={{
          "--hue": Math.min(currentPassword.length * 10, 120),
        }}
      >
        <Input
          sx={{
            height: "60px",
          }}
          color={inputColor}
          variant="soft"
          type="text"
          placeholder="Current password"
          value={currentPassword}
          startDecorator={<Lock />}
          endDecorator={
            <IconButton onClick={handleClickShowPassword}>
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
          onChange={(event) => setCurrentPassword(event.target.value)}
        />

        <br />
        <Stack
          spacing={2}
          sx={{
            "--hue": Math.min(newPassword.length * 10, 120),
          }}
        >
          <Input
            sx={{
              height: "60px",
            }}
            variant="soft"
            color={inputColor}
            type={showNewPassword ? "text" : "newPassword"}
            placeholder="New password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            startDecorator={<Lock />}
            endDecorator={
              <IconButton onClick={handleClickShowPassword}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />
          {/* <br /> */}
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
            type={showNewPassword ? "text" : "newPassword"}
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            startDecorator={<Lock />}
            endDecorator={
              <IconButton onClick={handleClickShowPassword}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />
          <LinearProgress
            determinate
            size="sm"
            value={Math.min((newPassword.length * 100) / minLength, 100)}
            sx={{
              bgcolor: "background.level3",
              color: "hsl(var(--hue) 80% 40%)",
            }}
          />
          <Typography
            level="body-xs"
            sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {newPassword.length < 3 && "Very weak"}
            {newPassword.length >= 3 && newPassword.length < 6 && "Weak"}
            {newPassword.length >= 6 && newPassword.length < 10 && "Strong"}
            {newPassword.length >= 10 && "Very strong"}
          </Typography>
        </Stack>
      </Stack>
      <br />
      <Button
        className="details-button"
        variant="contained"
        style={{
          height: "60px",
        }}
        onClick={() => handleSubmit()}
      >
        Register
      </Button>
    </div>
  );
}

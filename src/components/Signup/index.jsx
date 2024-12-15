import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FilledInput, FormControl, InputAdornment, InputLabel, TextField, Card } from "@mui/material";
import { useDispatch } from "react-redux";
import useNotification from "../../hooks/useNotification";
import { registerUser } from "../../features/user/userAction";
import "./sign-up.css";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showNotification = useNotification();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }
    try {
      const res = await dispatch(registerUser({ username, email, password })).unwrap();
      if (res?.data?.success === true) {
        showNotification("Account created successfully", "success");
        navigate("/login");
      } else {
        showNotification(res?.payload?.response?.data || "Error", "error");
      }
    } catch (error) {
      showNotification(error, "error");
      console.error("Error:", error);
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: "0px 10px",
      flexDirection: "column",
    }}
  >
    <Box
      className="logo-text-gradient"
      sx={{
        marginBottom: "20px",
        fontSize: "2.5rem",
        textAlign: "center",
        pb: 5,
      }}
    >
      SocialPulse
    </Box>


      <Card sx={{ width: "360px", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
 
        <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "24px", color: "#333" }}>Create Account</h1>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>Join us by creating a new account</p>
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: "#0A66C2" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputAdornment>
              }
              label="Password"
              sx={{
                borderRadius: "8px",
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <FilledInput
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              sx={{
                borderRadius: "8px",
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: "16px",
              backgroundColor: "#0A66C2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#004182",
              },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#0A66C2", textDecoration: "none", fontWeight: "bold" }}>
              Sign in
            </a>
          </p>
        </Box>
      </Card>
    </Box>
  );
};

export default SignupComponent;

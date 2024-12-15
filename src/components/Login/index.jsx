import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Button, FilledInput, FormControl, InputAdornment, InputLabel, TextField, Card } from "@mui/material";
import { useDispatch } from "react-redux";
import useNotification from "../../hooks/useNotification";
import { loginUser } from "../../features/user/userAction";
import "./login.css";
// import Logo from '../../assets/your_custom_logo.png'; // Replace with your own logo

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      if (res?.data?.success === true) {
        showNotification("Logged-In successfully", "success");
        navigate("/");
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
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src={Logo} alt="Logo" style={{ width: '150px' }} />
                </Box> */}
        <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "24px", color: "#333" }}>Welcome!</h1>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>Please sign in to your account</p>
        <form onSubmit={handleSubmit}>
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
            Sign In
          </Button>
        </form>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button variant="text" sx={{ color: "#0A66C2" }} onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </Button>
        </Box>
        {/* <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', color: '#555' }}>Or sign in with</p>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '50px',
                            border: '1px solid #ddd',
                            color: '#555',
                            '&:hover': {
                                borderColor: '#0A66C2',
                                color: '#0A66C2',
                            },
                            marginRight: '10px'
                        }}
                    >
                        <img
                            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                            alt="Google"
                            style={{ width: '20px', marginRight: '8px' }}
                        />
                        Google
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '50px',
                            border: '1px solid #ddd',
                            color: '#555',
                            '&:hover': {
                                borderColor: '#0A66C2',
                                color: '#0A66C2',
                            },
                        }}
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzN9MoFE5QBketEtGPpZhcoCkN7dPHxUfWfGJt-o5ULj3rSkfdAp9AE6TNvGllv6UymU&usqp=CAU"
                            alt="Apple"
                            style={{ width: '20px', marginRight: '8px' }}
                        />
                        Apple
                    </Button>
                </Box> */}
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            New to our platform?{" "}
            <a href="/signup" style={{ color: "#0A66C2", textDecoration: "none", fontWeight: "bold" }}>
              Join now
            </a>
          </p>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginComponent;

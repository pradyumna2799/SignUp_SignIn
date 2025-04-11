import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField, Typography } from '@mui/material';
import bgImg from './images/bg-img.avif';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fields cannot be empty.");

    const getDetails = JSON.parse(localStorage.getItem("user")) || [];
    const matchedUser = getDetails.find(user => user.email === email && user.password === password);   // Check if email and password match a user in localStorage

    if (matchedUser) {
      alert("Login successful.");
      navigate("/home");
    } else {
      setMsg("Invalid email or password.");
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        {msg && (
          <Typography variant="body2" color="error" align="center">
            {msg}
          </Typography>
        )}
        <TextField name="email" label="Email" fullWidth size="small" onChange={handleInput} />
        <TextField name="password" label="Password" type="password" fullWidth size="small" onChange={handleInput} />

        <Typography variant="body2">
          Want to create an account ?{' '}
          <a href="/signup" style={{ textDecoration: 'none', color: 'blue' }}>Sign Up</a>
        </Typography>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default SignIn;

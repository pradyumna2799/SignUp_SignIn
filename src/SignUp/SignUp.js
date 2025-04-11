import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import bgImg from './images/bg-img.avif';

function SignUp() {
  const userDetail = { name: "", email: "", password: "" };  // Initial state for new user details
  const [data, setData] = useState(userDetail);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleInput(e){
    const { name, value } = e.target;
    name === "confirmPassword"
      ? setConfirmPassword(value)
      : setData({ ...data, [name]: value });
  };

  function handleSubmit(e){
    e.preventDefault();
    const getData = JSON.parse(localStorage.getItem("user") || "[]");  // Fetch existing users from localStorage or return empty array
    const userExists = getData.some(user => user.email === data.email);  // Check if user already exists with same email

    const hasUpper = /[A-Z]/.test(data.password); // Validating password, must include uppercase
    const hasLower = /[a-z]/.test(data.password); //  must include lowercase letter
    const hasNumber = /[0-9]/.test(data.password); //  must include at least one number
    const hasSpecial = /[!@#$%^&*]/.test(data.password);  // checks for at least one special character

    if (userExists) return alert("User already exists.");
    if (!data.name || !data.email || !data.password || !confirmPassword)
      return alert("Please enter all details.");
    if (!data.email.includes("@")) return alert("Invalid email.");
    if (data.password.length < 6)
      return alert("Password should be at least 6 characters.");
    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial)
      return alert("Password must have uppercase, lowercase, number and special character.");
    if (data.password !== confirmPassword)
      return alert("Passwords do not match.");

    localStorage.setItem("user", JSON.stringify([...getData, data]));  // Save the new user to localStorage
    alert("Signup successful.");
    navigate("/signin");
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
          Sign Up
        </Typography>

        <TextField name="name" label="Name" fullWidth size="small" onChange={handleInput} />
        <TextField name="email" label="Email" fullWidth size="small" onChange={handleInput} />
        <TextField name="password" label="Password" type="password" fullWidth size="small" onChange={handleInput} />
        <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth size="small" onChange={handleInput} />

        <Typography variant="body2">
          Already have an account ?{' '}
          <a href="/signin" style={{ textDecoration: 'none', color: 'blue' }}>Sign In</a>
        </Typography>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp;

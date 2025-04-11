import { Box,Button} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  };

  return (
    <Box style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Welcome Home Page</h2>
      <Button onClick={logout} variant="contained" color="primary">Log out</Button>
    </Box>
  );
}

export default Home;

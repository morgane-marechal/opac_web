import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const right = localStorage.getItem('right');
  console.log('userRight', right)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('right');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="primary.main" component={Link} to="/allbooks">
                Notre collection
          </Button>        
        </Typography>

        {token && right === '1' && (
          <>
            <Button color="inherit" component={Link} to="/admin/users">
              Gérer les utilisateurs
            </Button>
            <Button color="inherit" component={Link} to="/admin/books">
              Gérer les livres
            </Button>
          </>
        )}
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Tableau de bord
            </Button>
            <Button color="#ba000d" onClick={handleLogout}>
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button color="#ba000d" component={Link} to="/login">
              Connexion
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Inscription
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

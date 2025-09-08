import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const right = localStorage.getItem('right');

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const isUserMenuOpen = Boolean(userAnchorEl);

  const handleAdminMenuOpen = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('right');
    handleUserMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2A5C8D' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button 
            component={Link} 
            to="/allbooks"
            sx={{ 
              color: '#f0eae1',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            Notre collection
          </Button>
        </Typography>

        {token && right === '1' && (
          <>
            <Button
              onClick={handleAdminMenuOpen}
              sx={{
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Gestion
            </Button>
            <Menu
              anchorEl={adminAnchorEl}
              open={isAdminMenuOpen}
              onClose={handleAdminMenuClose}
            >
              <MenuItem component={Link} to="/admin/users" onClick={handleAdminMenuClose}>
                Gérer les utilisateurs
              </MenuItem>
              <MenuItem component={Link} to="/admin/books" onClick={handleAdminMenuClose}>
                Gérer les livres
              </MenuItem>
              <MenuItem component={Link} to="/admin/borrows" onClick={handleAdminMenuClose}>
                Gérer les emprunts
              </MenuItem>
              <MenuItem component={Link} to="/admin/authors" onClick={handleAdminMenuClose}>
                Ajout d'auteurs
              </MenuItem>
              <MenuItem component={Link} to="/admin/editors" onClick={handleAdminMenuClose}>
                Ajout d'éditeurs
              </MenuItem>
            </Menu>
          </>
        )}

        {/* Icone utilisateur avec menu déroulant */}
        <IconButton
          onClick={handleUserMenuOpen}
          sx={{ color: '#f0eae1', ml: 2 }}
        >
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={userAnchorEl}
          open={isUserMenuOpen}
          onClose={handleUserMenuClose}
        >
          {token ? (
            <>
              <MenuItem 
                component={Link} 
                to="/dashboard" 
                onClick={handleUserMenuClose}
              >
                Tableau de bord
              </MenuItem>
              <MenuItem 
                onClick={handleLogout}
              >
                Déconnexion
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem 
                component={Link} 
                to="/login" 
                onClick={handleUserMenuClose}
              >
                Connexion
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/register" 
                onClick={handleUserMenuClose}
              >
                Inscription
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

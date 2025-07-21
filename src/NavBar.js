import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const right = localStorage.getItem('right');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('right');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2A5C8D' }}> {/* Couleur primaire */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button 
            component={Link} 
            to="/allbooks"
            sx={{ 
              color: '#f0eae1', // Beige clair
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            Notre collection
          </Button>        
        </Typography>

        {token && right === '1' && (
          <>
            <Button 
              component={Link} 
              to="/admin/users"
              sx={{ 
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Gérer les utilisateurs
            </Button>
            <Button 
              component={Link} 
              to="/admin/books"
              sx={{ 
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Gérer les livres
            </Button>
            <Button 
              component={Link} 
              to="/admin/borrows"
              sx={{ 
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Gérer les emprunts
            </Button>
          </>
        )}
        {token ? (
          <>
            <Button 
              component={Link} 
              to="/dashboard"
              sx={{ 
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Tableau de bord
            </Button>
            <Button 
              onClick={handleLogout}
              sx={{ 
                color: 'rgb(250, 160, 132)', // Rouge
                '&:hover': { backgroundColor: 'rgb(169, 142, 54, 0.2)'}
              }}
            >
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button 
              component={Link} 
              to="/login"
              sx={{ 
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Connexion
            </Button>
            <Button 
              component={Link} 
              to="/register"
              sx={{ 
                color: '#f0eae1',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Inscription
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import React from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import ListeBorrowedBookCard from './BooksBorrowedByUser';


const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const rawDate = user?.createdAt
  const date = new Date(rawDate);

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);

  return (
    <Box sx={{p:2}} >
       <Card sx={{ maxWidth: 345, margin: 5}}>
        <CardContent>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bienvenue, {user?.fullName} Avec les droits : {user?.right}
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {user?.email}
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Date d'inscription : {formattedDate}
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Mettre à jour</Button>
        </CardActions>
      </Card>
      <Divider>
        <Chip label="Emprunts" size="small" />
      </Divider>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Nombre d'emprunts en ce moment :
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Liste des livres actuellement empruntés :
      </Typography>
      <Divider>
        <Chip label="Retard" size="small" />
      </Divider>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Nombre de livres en retard :
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Liste des livres en retard :
      </Typography>
      <Divider>
        <Chip label="Réservation" size="small" />
      </Divider>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Nombre de livres réservés :
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Liste des livres réservés :
      </Typography> 
      {/* <ListeBorrowedBookCard></ListeBorrowedBookCard> */}
    </Box>
  );
};

export default Dashboard;

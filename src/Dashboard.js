import React from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ListeBorrowedBookCard from './BooksBorrowedByUserActive';
import ListeBorrowedBookCardActive from './BooksBorrowedByUserActive';
import ListeBorrowedBookCardLate from './BooksBorrowedByUserLate';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import ToastLateBook from './ToastLateBook'
import {Toaster} from 'react-hot-toast'

const Dashboard = () => {  
      const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      });

      // Sécurisation de la date
      const rawDate = user?.createdAt;
      const date = rawDate ? new Date(rawDate) : null;
      const formattedDate = date
        ? new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }).format(date)
        : '';
console.log('User in Dashboard:', user);
      // Envoi de l'événement d'entrée sur le dashboard
      useEffect(() => {
        if (!user?.id) return;

        fetch('http://localhost:3333/enter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Erreur lors de l’entrée dans le dashboard');
            }
            return res.json();
          })
          .then((data) => {
            console.log('Message SSE déclenché:', data);
          })
          .catch((err) => {
            console.error('Erreur API:', err);
          });
      }, [user?.id]);

      // Réception des messages SSE
      useEffect(() => {
        if (!user?.id) return;

        const eventSource = new EventSource(`http://localhost:3333/transmit/users/${user.id}`);

        eventSource.addEventListener('dashboard', (event) => {
          const data = JSON.parse(event.data);
          // console.log('[SSE] Message reçu :', data.message);
          // toast(data.message, {
          //   duration: 5000,
          //   position: 'bottom-right',
          // })
        });

        return () => {
          eventSource.close();
        };
      }, [user?.id]);

  return (
    <Box sx={{p:2}} >
      <ToastLateBook userId={user?.id}/>
      {/* <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
      }}
      />  */}
       <Card sx={{ maxWidth: 345, margin: 5}}>
        <CardContent>
        <Typography variant="h6" color='primary.gold' sx={{ flexGrow: 1 }}>
          Bienvenue, {user?.fullName} 
        </Typography>
        {user?.right === 1 && (
        <Typography variant="h8" sx={{ flexGrow: 1 }} color='grey.600'>
          Vous avez un rôle administratif.
        </Typography>    
        )}
        <Typography variant="h8" sx={{ flexGrow: 1 }} color='grey.600'>
          {user?.email}
        </Typography>
        <Typography variant="h8" sx={{ flexGrow: 1 }} color='grey.600'>
        Inscrit.e le {formattedDate}
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Mettre à jour</Button>
        </CardActions>
      </Card>
      <Divider>
        <Chip label="Emprunts" size="small"/>
      </Divider>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h8" color='primary.light' sx={{ mb: 2 }}>
            Liste des livres actuellement empruntés :
          </Typography>
          <Box sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            py: 1,
            mb: 2
          }}>
            <ListeBorrowedBookCardActive />
          </Box>
      </Box>
      <Divider>
        <Chip label="Retard" size="small" />
      </Divider>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h8" color='primary.dark' sx={{ flexGrow: 1 }}>
          Liste des livres en retard :
        </Typography>
        <Box sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            py: 1,
            mb: 2
        }}>

          <ListeBorrowedBookCardLate />
        </Box>
      </Box>
      <Divider>
        <Chip label="Réservation" size="small" />
      </Divider>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Nombre de livres réservés :
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
       Liste des livres réservés :
      </Typography> 

    </Box>
  );
};

export default Dashboard;

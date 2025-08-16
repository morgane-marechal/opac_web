import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import {Toaster} from 'react-hot-toast'



function ToastLateBook({userId}) {

      // Envoi de l'événement d'entrée sur le dashboard
      useEffect(() => {
        if (!userId) return;

        fetch('http://localhost:3333/enter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Erreur lors de l’entrée dans le dashboard');
            }
            return res.json();
          })
          .then((data) => {
            console.log('Message SSE déclenché pour retards :', data);
          })
          .catch((err) => {
            console.error('Erreur API:', err);
          });
      }, [userId]);

      // Réception des messages SSE
      useEffect(() => {
        if (!userId) return;

        const eventSource = new EventSource(`http://localhost:3333/transmit/borrows/${userId}`);

        eventSource.addEventListener('late', (event) => {
          const data = JSON.parse(event.data);
          console.log('[SSE Retards] Message reçu :', data.message);
          toast(data.message, {
            duration: 5000,
            position: 'top-right',
            style: {
            background: '#ba000d',
            color: '#fff',
          },
        })
        
        });

        return () => {
          eventSource.close();
        };
      }, [userId]);
  return (
    <Box sx={{p:2}} >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#ba000d',
              color: '#ba000d',
            },
          }} 
        />
    </Box>
  );
};
export default ToastLateBook
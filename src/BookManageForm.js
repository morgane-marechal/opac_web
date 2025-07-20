import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './validationSchema';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';




import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper
} from '@mui/material';

const BookManageForm = (props) => {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { state } = useLocation();
   console.log("props manage book" , state)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

const onSubmit = async (data) => {
  setServerError('');
  setSuccessMessage('');

  console.log("Données envoyées au serveur :", data);

  try {
    const response = await fetch(`http://127.0.0.1:3333/user/updateBook/${props.data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur du serveur :', errorData);

      if (errorData.message) {
        setServerError(errorData.message);
      } else {
        setServerError('Une erreur est survenue lors de l’inscription.');
      }
    } else {
      const result = await response.json();
      console.log('Inscription réussie :', result);
      setSuccessMessage('Inscription réussie !');

    }
  } catch (error) {
    console.log('Probleme',error)
    console.error('Erreur réseau :', error);
    setServerError('Une GROSSE erreure est survenue');
  }
};

  return (
    <Container maxWidth="m">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>Enregistrer une nouvelle notice de livre</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
        <Box sx={{display:"flex"}}>
        <TextField
          label= {state.book.data.title}
          fullWidth
          margin="normal"
          {...register('title')}
          // error={!!errors.username}
          // helperText={errors.username?.message}
        />
        <TextField
          label="Auteur"
          fullWidth
          margin="normal"
          {...register('title')}
          // error={!!errors.username}
          // helperText={errors.username?.message}
        />
        </Box>

        <TextField
          label={state.book.data.description}
          multiline
          rows={6} 
          fullWidth
          margin="normal"
          {...register('description')}
        />
        <Box sx={{display:"flex"}}>
        <TextField
          label={state.book.data.isbn}
          margin="normal"
          fullWidth
          {...register('isbn')}
          // error={!!errors.password}
          // helperText={errors.password?.message}
        />
        <TextField
          label={state.book.data.deweyIndice}
          fullWidth
          margin="normal"
          {...register('dewey_indice')}
          // error={!!errors.confirmPassword}
          // helperText={errors.confirmPassword?.message}
        />
        </Box>
        <Box sx={{display:"flex"}}>
        <TextField
          label={state.book.data.cover}
          fullWidth
          margin="normal"
          {...register('cover')}
          // error={!!errors.confirmPassword}
          // helperText={errors.confirmPassword?.message}
        />
        <TextField
          label={state.book.data.pdf}
          type="password"
          fullWidth
          margin="normal"
          {...register('pdf')}
          // error={!!errors.confirmPassword}
          // helperText={errors.confirmPassword?.message}
        />
        </Box>


        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ 
            color: '#f0eae1','&:hover': { backgroundColor: 'rgb(60, 137, 201)' }
          }}
        >
         Enregistrer
        </Button>
        {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        
      </Box>
      </Paper>
    </Container>
  );
}

export default BookManageForm;

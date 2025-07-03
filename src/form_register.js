import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './validationSchema';
import { useState } from 'react';


import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper
} from '@mui/material';

function RegisterForm() {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    const response = await fetch('http://127.0.0.1:3333/user/register', {
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>S’inscrire</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
        <TextField
          label="Nom d'utilisateur"
          fullWidth
          margin="normal"
          {...register('full_name')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirmer le mot de passe"
          type="password"
          fullWidth
          margin="normal"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          S’inscrire
        </Button>
        {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        
      </Box>
      </Paper>
    </Container>
  );
}

export default RegisterForm;

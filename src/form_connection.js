import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Importation de useForm
import { yupResolver } from '@hookform/resolvers/yup'; // Résolveur pour yup
import * as yup from 'yup'; // Importation de yup
import { loginSchema } from './validationSchema';



const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema), 
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await fetch('http://localhost:3333/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur inconnue');
      }

      const dataResponse = await res.json();
      //renommage de email en useremail pour éviter confusion
      const { token, fullName, email : useremail, id, right, createdAt, updatedAt } = dataResponse;

      // Créer un objet utilisateur avec ces informations
      const user = { fullName, email : useremail, id, right, createdAt, updatedAt };

      // Nettoyer le localStorage avant de le stocker
      localStorage.clear();

      // Stocker le token et l'objet utilisateur dans le localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('right', JSON.stringify(user.right));

      console.log('Utilisateur connecté :', user);

      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error.message);
      alert('Échec de la connexion : ' + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            required
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth               
              sx={{ 
                color: '#f0eae1','&:hover': { backgroundColor: 'rgb(60, 137, 201)' }
              }}>
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;

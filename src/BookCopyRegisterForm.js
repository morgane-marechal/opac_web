import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';







const BookCopyRegisterForm = (props) => {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

const { state } = useLocation();
const passedProps = state?.book;

  useEffect(() => {
  console.log('Props passées via Link :', passedProps);
    console.log('Props bookID :', passedProps.data.id);

}, [passedProps]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (formData) => {
    setServerError('');
    setSuccessMessage('');
    const bookId = passedProps.data.id;

    const payload = {
      books_id: passedProps.id,
      state: formData.state,
    };

    console.log('Envoi au serveur (CREATE) :', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`http://localhost:3333/registerBookCopy/${bookId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
      console.log('Erreurs de validation côté serveur:', result);
      setServerError(result.message || 'Erreur lors de la création');
      } else {
        setSuccessMessage('Exemplaire de livre créé avec succès !');
        const ajouterAutre = window.confirm('Exemplaire créé ! Voulez-vous ajouter un autre exemplaire ?');

      if (ajouterAutre) {
        reset();          // vide le formulaire
        setSuccessMessage('');  // on efface le message succès (optionnel)
        setServerError('');
      } else {
        navigate('/admin/bookCopy');
      }
        // reset();
        // navigate('/admin/bookCopy');
      }
    } catch (error) {
      console.error(error);
      setServerError('Erreur réseau');
    }
  };




  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ajouter un exemplaire
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="state-label">État de l'exemplaire</InputLabel>
            <Select
              labelId="state-label"
              label="État de l'exemplaire"
              defaultValue=""
              {...register('state', { required: 'Ce champ est requis' })}
              error={Boolean(errors.state)}
            >
            <MenuItem value="4" data-cy="state-disponible">Disponible</MenuItem>
            <MenuItem value="2" data-cy="state-reserve">Réservé</MenuItem>
            <MenuItem value="3" data-cy="state-perdu">Perdu</MenuItem>
            <MenuItem value="1" data-cy="state-indisponible">Indisponible</MenuItem>
            </Select>
            {errors.state && (
              <Typography color="error" variant="body2">
                {errors.state.message}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, color: '#f0eae1', '&:hover': { backgroundColor: 'rgb(60, 137, 201)' } }}
          >
            Ajouter un exemplaire
          </Button>

          {serverError && <Typography color="error" mt={2}>{serverError}</Typography>}
          {successMessage && <Typography color="success.main" mt={2}>{successMessage}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookCopyRegisterForm;

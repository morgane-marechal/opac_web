import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';

const BookCopyRegisterForm = () => {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();
  const passedProps = state?.book;

  useEffect(() => {
    console.log('Props passées via Link :', passedProps);
    console.log('Props bookID :', passedProps?.id);
  }, [passedProps]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (formData) => {
    setServerError('');
    setSuccessMessage('');
    const bookId = passedProps.id;

    const payload = {
      books_id: bookId,
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
        setOpenDialog(true); 
      }
    } catch (error) {
      console.error(error);
      setServerError('Erreur réseau');
    }
  };

  const handleDialogYes = () => {
    reset();
    setSuccessMessage('');
    setServerError('');
    setOpenDialog(false);
  };

  const handleDialogNo = () => {
    setOpenDialog(false);
    navigate('/admin/books');
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
              <MenuItem value="4">Disponible</MenuItem>
              <MenuItem value="2">Réservé</MenuItem>
              <MenuItem value="3">Perdu</MenuItem>
              <MenuItem value="1">Indisponible</MenuItem>
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

      <Dialog open={openDialog} onClose={handleDialogNo}>
        <DialogTitle>Exemplaire créé ! Voulez-vous ajouter un autre exemplaire ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogYes} color="primary">Oui</Button>
          <Button onClick={handleDialogNo} color="secondary">Non</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookCopyRegisterForm;

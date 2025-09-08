// EntityForm.js
import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';

const EntityForm = ({ title, apiUrl, onSuccess }) => {
  const [name, setName] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setServerError('');
    setSuccessMessage('');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Erreur lors de la création');
      } else {
        setSuccessMessage(`${title} ajouté avec succès !`);
        setName('');
        if (onSuccess) onSuccess(result);
      }
    } catch (err) {
      setServerError('Erreur réseau');
      console.error(err);
    }
  };

  return (
    <Paper elevation={0} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ajouter un {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label={`Nom ${title}`}
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Enregistrer
        </Button>
        {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </Box>
    </Paper>
  );
};

export default EntityForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateBookSchema } from './validationSchema';
import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';





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
     console.log("id du livre " , state.book.data.id)

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateBookSchema),
  });
  const initialAuthorIds = state?.book?.data?.autors?.map((a) => a.id) || [];
  const [selectedAuthorIds, setSelectedAuthorIds] = useState(() => {
  return state?.book?.data?.autors?.map((a) => a.id) || [];
  });
  const initialEditor = state?.book?.data?.editorId;
  const navigate = useNavigate();


  const [dataAuthors, setDataAuthors] = useState([]); 
  const [dataEditors, setDataEditors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForGetAuthors = async () => {
      try {
        const response = await fetch(`http://localhost:3333/getAuthors`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postAuthors = await response.json();
        console.log(postAuthors);
        setDataAuthors(postAuthors);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchForGetAuthors();
  }, []);

    useEffect(() => {
    const fetchForGetEditors = async () => {
      try {
        const response = await fetch(`http://localhost:3333/getEditors`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postEditor = await response.json();
        console.log(postEditor);
        setDataEditors(postEditor);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForGetEditors();
  }, []);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography>Erreur: {error}</Typography>;


    const onSubmit = async (formData) => {
      setServerError('');
      setSuccessMessage('');
      const payload = {
        ...formData,
        editorId: parseInt(formData.editor, 10),
        autorIds: selectedAuthorIds, // important !
        // genderIds: selectedGenderIds, // si ajout des genres
      };

      console.log('Envoi au serveur :', JSON.stringify(payload, null, 2));
      const bookId = state.book.data.id;


      try {
        const response = await fetch(`http://127.0.0.1:3333/updateBook/${bookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) {
          setServerError(result.message || 'Erreur lors de la mise à jour');
        } else {
          setSuccessMessage('Livre mis à jour avec succès !');
          navigate('/admin/books');
        }
      } catch (error) {
        console.error(error);
        setServerError('Erreur réseau');
      }
    };

  return (
    <Container maxWidth="m">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
      <Typography variant="h4" gutterBottom color='#A98E36'>Mettre à jour la notice</Typography>
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
      {/* <FormControl fullWidth margin="normal">
        <InputLabel id="author-label">Auteurs</InputLabel>
        <Select
          labelId="author-label"
          id="authors"
          multiple
          defaultValue={initialAuthorIds}
          {...register('authors')}
          renderValue={(selected) => {
            const selectedArray = Array.isArray(selected) ? selected : [selected];
            return dataAuthors
              .filter((author) => selectedArray.includes(author.id))
              .map((a) => a.name)
              .join(', ');
          }}
        >
          {dataAuthors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="author-label">Auteurs</InputLabel>
        <Select
          labelId="author-label"
          multiple
          value={selectedAuthorIds}
          onChange={(e) => setSelectedAuthorIds(e.target.value)}
          renderValue={(selected) =>
            dataAuthors
              .filter((author) => selected.includes(author.id))
              .map((a) => a.name)
              .join(', ')
          }
        >
          {dataAuthors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


        </Box>

        <TextField
          label={state.book.data.description}
          multiline
          rows={6} 
          fullWidth
          margin="normal"
          {...register('description')}
        />

        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="editor-label">Éditeur</InputLabel>
            <Select
              labelId="editor-label"
              id="editor"
              defaultValue={initialEditor} // Doit être un ID (ex: 2)
              {...register('editor')}
            >
              {dataEditors.map((editor) => (
                <MenuItem key={editor.id} value={editor.id}>
                  {editor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

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

import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateBookSchema } from './validationSchema'; // ton schema de validation
import {
  TextField,
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
import EditorForm from './EditorForm'
import AuthorForm from './AuthorForm'
import { AiFillPlusCircle } from 'react-icons/ai';
import { Modal } from '@mui/material';

const BookRegisterForm = () => {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [dataAuthors, setDataAuthors] = useState([]);
  const [dataEditors, setDataEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditorModal, setOpenEditorModal] = useState(false);
  const [openAuthorModal, setOpenAuthorModal] = useState(false);
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(updateBookSchema),
  });

  // Récupération des auteurs
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:3333/getAuthors');
        const authors = await response.json();
        setDataAuthors(authors);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAuthors();
  }, []);

  // Récupération des éditeurs
  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const response = await fetch('http://localhost:3333/getEditors');
        const editors = await response.json();
        setDataEditors(editors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEditors();
  }, []);

const onSubmit = async (formData) => {
  setServerError('')
  setSuccessMessage('')

  const payload = {
    title: formData.title,
    description: formData.description,
    isbn: formData.isbn,
    dewey_indice: formData.dewey_indice,
    cover: formData.cover,
    pdf: formData.pdf,
    editor_id: parseInt(formData.editor, 10), // correspond à la colonne editor_id
    autor_ids: formData.authors.map((id) => parseInt(id, 10)), // correspond à la table pivot
  }

  console.log('Envoi au serveur (CREATE) :', JSON.stringify(payload, null, 2))

  try {
    const response = await fetch('http://localhost:3333/registerBook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      setServerError(result.message || 'Erreur lors de la création')
    } else {
      setSuccessMessage('Livre créé avec succès !')
      reset()
      navigate('/admin/books')
    }
  } catch (error) {
    console.error(error)
    setServerError('Erreur réseau')
  }
}


  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">Erreur : {error}</Typography>;

  return (
    <Container maxWidth="m">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Enregistrer une nouvelle notice de livre
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Titre"
            fullWidth
            margin="normal"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="authors"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="author-label">Auteurs</InputLabel>
                <Select
                  labelId="author-label"
                  multiple
                  {...field}
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
            )}
          />
          <Button onClick={() => setOpenAuthorModal(true)}>
            <AiFillPlusCircle size="30px" color="#4B8F8C" />
          </Button>
          <Modal open={openAuthorModal} onClose={() => setOpenAuthorModal(false)}>
            <Box
              sx={{
                p: 4,
                bgcolor: "white",
                borderRadius: 2,
                width: 400,
                mx: "auto",
                mt: 10,
              }}
            >
              <AuthorForm
                onSuccess={(res) => {
                  console.log(res)
                  setDataAuthors((prev) => [...prev, res.author]); 
                  setValue("editor", res.author.id);
                  setOpenAuthorModal(false);
                }} 
              />
            </Box>
          </Modal>
          </Box>

          <TextField
            label="Description"
            multiline
            rows={6}
            fullWidth
            margin="normal"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="editor"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="editor-label">Éditeur</InputLabel>
                <Select
                  labelId="editor-label"
                  {...field}
                  error={!!errors.editor}
                >
                  {dataEditors.map((editor) => (
                    <MenuItem key={editor.id} value={editor.id}>
                      {editor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Button onClick={() => setOpenEditorModal(true)}>
            <AiFillPlusCircle size="30px" color="#4B8F8C" />
          </Button>

          <Modal open={openEditorModal} onClose={() => setOpenEditorModal(false)}>
            <Box
              sx={{
                p: 4,
                bgcolor: "white",
                borderRadius: 2,
                width: 400,
                mx: "auto",
                mt: 10,
              }}
            >
              <EditorForm
                onSuccess={(res) => {
                  setDataEditors((prev) => [...prev, res.editor]); 
                  setValue("editor", res.editor.id); 
                  setOpenEditorModal(false);
                }}               
              />
            </Box>
          </Modal>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="ISBN"
              fullWidth
              margin="normal"
              {...register('isbn')}
              error={!!errors.isbn}
              helperText={errors.isbn?.message}
            />
            <TextField
              label="Indice Dewey"
              fullWidth
              margin="normal"
              {...register('dewey_indice')}
              error={!!errors.dewey_indice}
              helperText={errors.dewey_indice?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="URL couverture"
              fullWidth
              margin="normal"
              {...register('cover')}
              error={!!errors.cover}
              helperText={errors.cover?.message}
            />
            <TextField
              label="PDF (lien)"
              fullWidth
              margin="normal"
              {...register('pdf')}
              error={!!errors.pdf}
              helperText={errors.pdf?.message}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              color: '#f0eae1',
              mt: 2,
              '&:hover': { backgroundColor: 'rgb(60, 137, 201)' },
            }}
          >
            Enregistrer
          </Button>

          {serverError && <Typography color="error" mt={2}>{serverError}</Typography>}
          {successMessage && <Typography color="success.main" mt={2}>{successMessage}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookRegisterForm;

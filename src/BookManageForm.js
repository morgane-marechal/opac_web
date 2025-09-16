import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateBookSchema } from './validationSchema'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillPlusCircle } from 'react-icons/ai';
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
} from '@mui/material'
import { Modal } from '@mui/material';
import EditorForm from './EditorForm'
import AuthorForm from './AuthorForm'


const BookManageForm = () => {
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { state } = useLocation()
  const navigate = useNavigate()
  const [openEditorModal, setOpenEditorModal] = useState(false);
  const [openAuthorModal, setOpenAuthorModal] = useState(false);
  const authorsBook = state.book.autors || [];


  // Valeurs initiales
  const initialAuthorIds = state?.book?.autors?.map((a) => a.id) || []
  const initialEditor = state?.book?.editorId || ''

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateBookSchema),
    defaultValues: {
      title: state.book.title,
      description: state.book.description,
      isbn: state.book.isbn,
      dewey_indice: state.book.deweyIndice,
      cover: state.book.cover,
      pdf: state.book.pdf,
      authors: initialAuthorIds,
      editor: initialEditor,
    },
  })

  const values = {
      title: state.book.title,
      description: state.book.description,
      isbn: state.book.isbn,
      dewey_indice: state.book.deweyIndice,
      cover: state.book.cover,
      pdf: state.book.pdf,
      authors: initialAuthorIds,
      editor: initialEditor,
  }
 console.log("auteur du livre", authorsBook)
  console.log("Default values:", values)

  // Données depuis l’API
  const [dataAuthors, setDataAuthors] = useState([])
  const [dataEditors, setDataEditors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`http://localhost:3333/getAuthors`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const authors = await response.json()
        setDataAuthors(authors)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAuthors()
  }, [])

  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const response = await fetch(`http://localhost:3333/getEditors`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const editors = await response.json()
        setDataEditors(editors)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEditors()
  }, [])

  if (loading) return <Typography>Chargement...</Typography>
  if (error) return <Typography>Erreur: {error}</Typography>

  // Soumission du formulaire
  const onSubmit = async (formData) => {
    setServerError('')
    setSuccessMessage('')
    const payload = {
      ...formData,
      editorId: parseInt(formData.editor, 10),
      autorIds: formData.authors,
    }

    console.log('Envoi au serveur :', payload)

    const bookId = state.book.id

    try {
      const response = await fetch(`http://127.0.0.1:3333/updateBook/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Erreur lors de la mise à jour')
      } else {
        setSuccessMessage('Livre mis à jour avec succès !')
        navigate('/admin/books')
      }
    } catch (error) {
      console.error(error)
      setServerError('Erreur réseau')
    }
  }

  return (
    <Container maxWidth="m">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom color="#A98E36">
          Mettre à jour la notice
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          {/* Titre */}
          <TextField
            label="Titre"
            fullWidth
            margin="normal"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          {/* Description */}
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
          {/* Auteurs */}
          <Controller
            name="authors"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="author-label">Auteurs</InputLabel>
                <Select
                  {...field}
                  labelId="author-label"
                  multiple
                  renderValue={(selected) =>
                    dataAuthors
                      .filter((a) => selected.includes(a.id))
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
                  setValue("author", res.author.id);
                  setOpenAuthorModal(false);
                }} 
              />
            </Box>
          </Modal>  
          </Box>       
          

          <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="editor"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="editor-label">Éditeur</InputLabel>
                <Select {...field} labelId="editor-label">
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
          {/* ISBN + Dewey */}
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

          {/* Cover + PDF */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Cover"
              fullWidth
              margin="normal"
              {...register('cover')}
              error={!!errors.cover}
              helperText={errors.cover?.message}
            />
            <TextField
              label="PDF"
              fullWidth
              margin="normal"
              {...register('pdf')}
              error={!!errors.pdf}
              helperText={errors.pdf?.message}
            />
          </Box>

          {/* Bouton submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              color: '#f0eae1',
              '&:hover': { backgroundColor: 'rgb(60, 137, 201)' },
            }}
          >
            Enregistrer
          </Button>

          {/* Messages */}
          {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </Box>
      </Paper>
    </Container>
  )
}

export default BookManageForm

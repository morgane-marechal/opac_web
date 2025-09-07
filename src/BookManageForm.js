import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateBookSchema } from './validationSchema'
import { useLocation, useNavigate } from 'react-router-dom'
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

const BookManageForm = () => {
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { state } = useLocation()
  const navigate = useNavigate()

  // Valeurs initiales
  const initialAuthorIds = state?.book?.data?.authors?.map((a) => a.id) || []
  const initialEditor = state?.book?.data?.editorId || ''

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateBookSchema),
    defaultValues: {
      title: state.book.data.title,
      description: state.book.data.description,
      isbn: state.book.data.isbn,
      dewey_indice: state.book.data.deweyIndice,
      cover: state.book.data.cover,
      pdf: state.book.data.pdf,
      authors: initialAuthorIds,
      editor: initialEditor,
    },
  })

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
      authorIds: formData.authors,
    }

    console.log('Envoi au serveur :', payload)

    const bookId = state.book.data.id

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

          {/* Éditeur */}
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

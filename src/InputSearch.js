import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import Divider from '@mui/material/Divider';

export function InputSearch() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  

  const fetchSearchResults = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:3333/search/${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      console.log("data from search",data)

    
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    if (search.trim() !== '') {
      fetchSearchResults(search);
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          color: 'rgb(233, 233, 233)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
        }}
      >
        <AiOutlineSearch size="30px" />
      </Button>

    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          width: '400px',  
        }}
      >
        <Typography id="search-modal-title" variant="h6" mb={2}>
          Recherche de livres
        </Typography>

        <TextField
          fullWidth
          label="Rechercher..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <List
          sx={{
            position: "absolute",
            top: "100%", // juste sous l'input
            left: 0,
            right: 0,
            bgcolor: "background.paper",
            borderRadius: 1,
            maxHeight: 500,
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((book, index) => (
              <React.Fragment key={book.id}>
                <ListItem
                  button
                  onClick={() => {
                    setOpen(false);
                    navigate("/bookinfo", { state: { book } });
                  }}
                  sx={{ alignItems: "flex-start" }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="text.primary">
                        {book.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {book.autors?.map((autor) => autor.name).join(", ") ||
                          "Auteur inconnu"}
                      </Typography>
                    }
                  />
                </ListItem>

                {/* Divider sauf pour le dernier élément */}
                {index < searchResults.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, px: 2 }}>
              Aucun résultat
            </Typography>
          )}
        </List>

      </Box>
    </Modal>

    </Box>
  );
}

import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
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



export function InputSearch() {

      
  const [search, setSearch] = useState(""); // 🔹 Ajout du type string
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async (searchTerm) => {    try {
      const response = await fetch(`http://localhost:3333/search/${search}`);
      const data = await response.json();
      setSearchResults(data);
      console.log('search',searchResults);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    // Vérifie que `search` n'est pas vide avant d'effectuer la recherche
    if (search.trim() !== '') {
      fetchSearchResults(search);
    } else {
      setSearchResults([]); // Vider les résultats si la recherche est vide
    }
  }, [search]); // Le `fetchSearchResults` sera exécuté à chaque changement de `search`


  return (
    <Box>
          <Button>
            <AiOutlineSearch size="30px" color="#4B8F8C" />
          </Button>     
    </Box>
    );
};

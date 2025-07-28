import React from "react";
import './App.css';
import { Typography, Container, Grid } from '@mui/material'; // Ajout de Grid
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import BorrowsManagementCard from "./BorrowsManagementCard";



function BorrowsManagement() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3333/getAllBorrows`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        console.log("borrows", postsData);
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]); // Mettre un tableau vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };
    fetchDataForPosts();
  }, []);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography>Erreur: {error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="text.secondary" gutterBottom>
        Gestion des emprunts
      </Typography>
        <Button size="small" component={Link} 
            to="/admin/registerBook">
            Ajouter un emprunt
        </Button>
      
        {data.map((borrow, index) => (
            <BorrowsManagementCard key ={index} data={borrow} />
        ))}
    </Container>
  );
}

export default BorrowsManagement;
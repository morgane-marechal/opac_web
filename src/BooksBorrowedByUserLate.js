import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import cover from './media/placeholderbook.png';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
// import BookBorrowedCard from './BookBorrowedCard'


const ListeBorrowedBookCardLate = (props) => {
    console.log("props" , props)
    const { state } = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.id)


    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataForPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3333/borrowsByUser/${user.id}?filter=late`);
            if (!response.ok) {
            throw new Error(`HTTP error: Status ${response.status}`);
            }
            let postsData = await response.json();
            setData(postsData.data || postsData);
            console.log("late : ",postsData)
            setError(null);
        } catch (err) {
            setError(err.message);
            setData([]);            
        } finally {
            setLoading(false);
        }
                    console.log('datas', data)

        };
        fetchDataForPosts();
    }, []);

         useEffect(() => {
        console.log("data mis à jour :", data);
        }, [data]);   

    if (loading) return <Typography>Chargement...</Typography>;
    if (error) return <Typography>Erreur: {error}</Typography>;
   



    return (
        <Card sx={{ 
                display: 'flex',
                flexDirection: 'column',
                width: '70%',        
                maxWidth: 1000,       
                height: 600,
                margin: '30px auto',  
            }}>

        </Card>
    );
}

export default ListeBorrowedBookCardLate;
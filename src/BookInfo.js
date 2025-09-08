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
import BookStatus from './BookStatus'


const BookCard = (props) => {
    console.log("props" , props)
      const { state } = useLocation();
        // const book = state?.book;
        console.log("state", state.book.data.cover)
    const authors = state.book.data.autors || [];
    const editor = state.editor || [];
    const coverImage = state.book.data.cover ? require(`./media/${state.book.data.cover}`) : cover;

    const bookId = state.book.data.id;

    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataForPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3333/statusByBook/${bookId}`);
            if (!response.ok) {
            throw new Error(`HTTP error: Status ${response.status}`);
            }
            let postsData = await response.json();
            setData(postsData.data || postsData);
            console.log(postsData)
            console.log("data f", data)          
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

            <Box sx={               
               { display: 'flex', 
                flexDirection: 'row', 
                flexShrink: 0 }
                }>
                <CardMedia
                    sx={{ 
                        width: '20%',
                        height: 200,
                        objectFit: 'cover'
                    }}
                    image = {coverImage}
                    loading="lazy"
                />
                <CardContent sx={{ 
                        width: '80%',
                        height: '100%',
                        objectFit: 'cover'
                    }}>
                    <Typography gutterBottom variant="h6" color="primary.main" component="div">
                        {state.book.data.title}
                   </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        {authors.map(author => author.name).join(', ')}                  
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            // WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '6em',
                        }}
                    >
                        {state.book.data.description}
                    </Typography>      
                </CardContent>

            </Box>
            <Box>
            <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Les exemplaires de notre bibliothèque :               
                    </Typography> 

                    {data.length === 0 ? (
                        <Typography>Aucun exemplaire trouvé.</Typography>
                        ) : (
                        data.map((status, index) => (
                            <BookStatus key={status.id || index} status={status} />
                            ))
                            
                        )}
            
            </CardContent>
            </Box>
        </Card>
    );
}

export default BookCard;
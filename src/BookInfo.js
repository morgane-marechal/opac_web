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
import BookStatus from './BookStatus';
import { Link } from 'react-router-dom';
import { AiFillFileAdd } from 'react-icons/ai';



const BookCard = (props) => {
    console.log("props" , props)
      const { state } = useLocation();
    const book = state?.book;
    const token = localStorage.getItem('token');
    const right = localStorage.getItem('right');

    const authors = state.book.autors || [];
    const editor = state.editor || [];
    const coverImage = state.book.cover ? require(`./media/${state.book.cover}`) : cover;

    const bookId = state.book.id;

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
                height: { xs: '100%', sm: 600 },
                margin: '30px auto',  
            }}>

            <Box sx={               
               { display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                flexShrink: 0 }
                }>
                <CardMedia
                    sx={{ 
                        width: {sm:'20%', xs: '50%'},
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
                        {state.book.title}
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
                        {state.book.description}
                    </Typography>      
                </CardContent>

            </Box>
            <Box>
            <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Les exemplaires de notre bibliothèque :               
                    </Typography> 
                    {token && right === '1' ?(
                    <Button size="small" component={Link} to="/admin/registerBookCopy" state={{ book: state.book }}>
                        <AiFillFileAdd size="30px" color="#4B8F8C" />
                    </Button>): ""}

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
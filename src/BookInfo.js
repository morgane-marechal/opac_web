import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import cover from './media/placeholderbook.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const BookCard = (props) => {
    console.log("props" , props)
      const { state } = useLocation();
        // const book = state?.book;
        console.log("state", state.book.data)
    const authors = state.autors || [];
    const editor = state.editor || [];
    const coverImage = cover;

    return (
            <Card sx={{ 
                display: 'flex',
                width: '70%',        
                maxWidth: 1000,       
                height: 600,
                margin: '30px auto',  
            }}>
            <CardMedia
                sx={{ 
                    width: 200,
                    height: 200,
                    objectFit: 'cover'
                }}
                image = {coverImage}
            />
            <Box sx={               
               { display: 'flex', 
                flexDirection: 'column', 
                width: 220, 
                flexShrink: 0 }
                }>
                <CardContent>
                    <Typography gutterBottom variant="h6" color="primary.main" component="div">
                        {state.book.data.title}
                   </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        {/* {authors.map(author => author.name).join(', ')}                   */}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '6em' 
                        }}
                    >
                        {/* {props.data.description} */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {/* Edition : {editor.name}                */}
                    </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }} color="tertiary.main">
                    <Button size="small">Réserver</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default BookCard;
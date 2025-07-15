import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import cover from './media/placeholderbook.png';

const BookCard = (props) => {
    console.log(props.editor)
    const authors = props.data.autors || [];
    const editor = props.data.editor || [];

    const coverImage = props.data.cover ? require(`./media/${props.data.cover}`) : cover;
    return (
        <Card sx={{ display: 'flex', maxWidth: 350 , height: 300}}>
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
                        {props.data.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        {authors.map(author => author.name).join(', ')}                  
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
                        {props.data.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Edition : {editor.name}               
                    </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }} color="tertiary.main">
                    <Button size="small">En savoir plus</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default BookCard;
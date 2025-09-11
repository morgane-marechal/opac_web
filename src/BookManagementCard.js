import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { BsTools } from 'react-icons/bs';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiFillFileAdd } from 'react-icons/ai';


const BookManagementCard = (props) => {
    const authors = props.data.autors || [];
    const editor = props.data.editor || [];
    
    const deleteBook = async (id) => {
        const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer ce livre "${props.data.title}"  ?`);
        if (!confirmation) return; 
        try {
            const response = await fetch(`http://localhost:3333/deleteBookById/${id}`, {
            method: 'DELETE',
            });
            if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
            }
            alert("Livre supprimé avec succès !");
        } catch (error) {
            alert(`Échec de la suppression : ${error.message}`);
        }
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 1 }}>

            <Box sx={               
               { display: 'flex', 
                flexDirection: 'column', 
                width: '60%', 
                flexShrink: 0 }
                }>
                <CardContent>
                    <Typography gutterBottom variant="h6" color="primary.main" component="div">
                        {props.data.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" >
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
                        }}
                    >
                        {props.data.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        Edition : {editor.name}               
                    </Typography>
                </CardContent>

            </Box>
                <CardActions color="tertiary.main">
                    <Button size="small" component={Link} 
                        to="/admin/registerBookCopy" state={{ book: props }}> <AiFillFileAdd size='30px' color='#4B8F8C'/> 
                    </Button>
                    <Button size="small" component={Link} 
                        to="/bookinfo" state={{ book: props }}> <BsFillInfoCircleFill size='30px' color='#4B8F8C'/> 
                    </Button>
                    <Button size="small" component={Link} 
                        to="/admin/manageBook" state={{ book: props }}> <BsTools size='30px' color='#A98E36'/> 
                    </Button>
                    <Button size="small" component={Link} 
                        onClick={() => deleteBook(props.data.id)} > <FaDeleteLeft size='30px' color='red'/> 
                    </Button>
                </CardActions>
        </Card>
    );
}

export default BookManagementCard;
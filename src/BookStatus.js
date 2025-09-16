import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


const BookStatusCard = ({ status }) => {
  const token = localStorage.getItem('token');
  const right = localStorage.getItem('right');



    const BookStatus = {
    1: ['Indisponible', 'rgb(243, 40, 25)'],
    2: ['Réservé', 'rgb(169, 142, 54)'],
    3: ['Manquant', 'rgb(117, 76, 38)'],
    4: ['Disponible', 'rgb(75, 143, 140)']
    };

    return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: {xs:1, sm: 4} }}>
        <Typography variant="body2">
            N° exemplaire : {status.id}
        </Typography>
        <Typography variant="body2" color={BookStatus[status.state][1]}>
            Status : {BookStatus[status.state][0]}
        </Typography>
        </CardContent>
        {(status.state === 4) ?
        (<CardActions >
            <Button size="small">Réserver</Button>
        </CardActions>) : ""}
        {token && right === '1' ?(
            <CardActions>
                <Button size="small" >Supprimer l'exemplaire</Button>
            </CardActions>) : ""}
        </Card>
    );

};

export default BookStatusCard;

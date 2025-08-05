import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';



const BorrowsManagementCard = ({ data }) => {
console.log("status livre emprunté",  data )



    const BookStatus = {
    1: ['Indisponible', 'rgb(243, 40, 25)'],
    2: ['Réservé', 'rgb(169, 142, 54)'],
    3: ['Manquant', 'rgb(117, 76, 38)'],
    4: ['Disponible', 'rgb(50, 128, 27)']
    };

    const isLate = () => {
        if (!data.planeDateReturn) return false;
        
        const today = new Date();
        const returnDate = new Date(data.planeDateReturn);
        return returnDate < today /*&& data.statut === 1  => à rejouter qd bdd maj*/; // Seulement en retard si statut = EN_COURS
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifié';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
    <Card sx={{ display: 'flex', width:'100%', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 1 }}>
        <CardContent sx={{ display: 'flex', gap: 4 }}>
        <Typography variant="body2">
            N° {data.id}
        </Typography>
        <Typography variant="body2" >
           {data.bookCopy.book.title}
        </Typography>
        <Typography sx={{ color: isLate() ? 'error.main' : 'success.main' }}>
          {isLate() ? 'En retard' : 'À jour'}
        </Typography>
        <Typography variant="body2">
          Retour prévu: {formatDate(data.planeDateReturn)}
        </Typography>
        <Typography variant="body2">
          {isLate() ? <Tooltip title="Envoyer un email">{data.user.email} </Tooltip>: ''}
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Retourné</Button>
        </CardActions>
        </Card>
    );

};

export default BorrowsManagementCard;

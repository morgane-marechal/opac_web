import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Tooltip } from '@mui/material';

const BorrowsManagementCard = ({ data }) => {
  console.log("status livre emprunté", data);

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
    return returnDate < today; 
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        mb: 2,
        p: 1,
        width: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: 2,
          width: '100%',
        }}
      >
        <Box       sx={{
          display: 'flex',
          flexDirection:'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: {sm:2},
          p: 1,
          }}>
        <Typography variant="body2" sx={{ minWidth: 50 }}>
          N° {data.id}
        </Typography>
        <Typography variant="body2" sx={{ flex: 1 }}>
          {data.bookCopy.book.title}
        </Typography>
        </Box>
        <Box       sx={{
          display: 'flex',
          flexDirection:'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: {sm:2},
          p: 1,
        }}>
        <Typography
          variant="body2"
          sx={{
            color: isLate() ? 'error.main' : 'success.main',
            fontWeight: 500,
            minWidth: 80,
          }}
        >
          {isLate() ? 'En retard' : 'À jour'}
        </Typography>
        <Typography variant="body2" sx={{ minWidth: 140 }}>
          Retour prévu: {formatDate(data.planeDateReturn)}
        </Typography>
        </Box>
        <Box       sx={{
            display: 'flex',
            flexDirection:'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: {sm:2},
            p: 1,
          }}>
        {isLate() && (
          <Tooltip title="Envoyer un email">
            <Typography variant="body2" sx={{ minWidth: 180 }}>
              {data.user.email}
            </Typography>
          </Tooltip>
        )}
        </Box>
      </CardContent>
        <Box       sx={{
          display: 'flex',
          flexDirection:'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: {sm:2},
          p: 1,
        }}>
      <CardActions sx={{ mt: { xs: 1, sm: 0 } }}>
        <Button size="small" variant="contained" color="primary">
          Retourné
        </Button>
      </CardActions>
      </Box>
    </Card>
  );
};

export default BorrowsManagementCard;

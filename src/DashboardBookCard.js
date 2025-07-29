import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const DashboardBookCard = (props) => {
 
    console.log("dashboard book card",props)
    // console.log(props.data.borrowDate)
    const formatFrenchDate = (dateString) => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date(dateString));
    };

    const borrowDateFormatted = formatFrenchDate(props.data.borrowDate);
    const planeDateReturn = formatFrenchDate(props.data.planeDateReturn);

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, minWidth: 280 }}>
            <Box sx={               
               { display: 'flex', 
                flexDirection: 'column', 
                width: '100%', 
                flexShrink: 0 }
                }>
                <CardContent>
                    <Box sx = {{display:'flex', alignItems: 'center', justifyContent: 'space-between', p: 1}}>
                     <Typography variant="subtitle2" color="text.secondary" >
                       N° : {props.data.id}
                    </Typography>   
                    <Typography variant="body2" color="text.secondary" >
                        ISBN : {props.data.bookCopy.book.isbn}                   
                    </Typography>                       
                    </Box>
                    {/* <Box> */}
                        <Typography variant="body2" color="text.secondary" >
                            {props.data.bookCopy.book.title}                
                        </Typography>                        
                    {/* </Box>
                    <Box sx = {{display:'flex', alignItems: 'center', justifyContent: 'space-between', p: 1}}> */}
                        <Typography variant="body2" color="text.secondary" >
                            Début de l'emprunt le {borrowDateFormatted}         
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            Date limite de retour le {planeDateReturn}             
                        </Typography>                        
                    {/* </Box> */}
                </CardContent>
            </Box>
        </Card>
    );
}

export default DashboardBookCard;
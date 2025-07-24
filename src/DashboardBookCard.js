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


const DashboardBookCard = (props) => {
 
console.log("dashboard book card",props)
// console.log(props.data.borrowDate)
// const date = props.data.borrowDate 
// const formattedDateBorrow = new Intl.DateTimeFormat('fr-FR', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric'
//     }).format(date);

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
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
                        ISBN : {props.data.ISBN}                   
                    </Typography>                       
                    </Box>
                    {/* <Box> */}
                        <Typography variant="body2" color="text.secondary" >
                            {props.data.bookCopy.book.title}                
                        </Typography>                        
                    {/* </Box>
                    <Box sx = {{display:'flex', alignItems: 'center', justifyContent: 'space-between', p: 1}}> */}
                        <Typography variant="body2" color="text.secondary" >
                            Début de l'emprunt             
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            Date limite de retour               
                        </Typography>                        
                    {/* </Box> */}
                </CardContent>
            </Box>
        </Card>
    );
}

export default DashboardBookCard;
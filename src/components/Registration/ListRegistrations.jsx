import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { grey } from '@mui/material/colors';
import Moment from 'react-moment';
import 'moment-timezone';
export default function ListRegistrations() {

    const [registrations, setRegistrations] = useState([]);

    useEffect( () => {
        getRegistrations()
    },[]);

    const getRegistrations = async () => {
        const res = await axios.get(process.env.REACT_APP_URI_BACKEND+'/registration');
        setRegistrations(res.data);
    }

    return (
        <Box pt={2}>
            <Container maxWidth="xl" sx={{py:2, backgroundColor: grey[300]}}>
                <Grid container>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow align="center">
                                    <TableCell>Rut</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Fecha Registro</TableCell>
                                    <TableCell>Hora Registro</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {registrations.map((registration) => (
                                <TableRow
                                    key={registration.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{registration.Person.rut}</TableCell>
                                    <TableCell>{registration.Person.name}</TableCell>
                                    <TableCell>{registration.Person.TypePerson.description}</TableCell>
                                    <TableCell><Moment tz="America/Santiago" format="DD/MM/YYYY">{registration.registration_date}</Moment></TableCell>
                                    <TableCell><Moment tz="America/Santiago" format="HH:mm:ss">{registration.registration_date}</Moment></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        </Box>
    )
}
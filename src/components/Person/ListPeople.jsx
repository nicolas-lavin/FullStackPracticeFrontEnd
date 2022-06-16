import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddBox from '@mui/icons-material/AddBox';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { Delete, Edit } from '@mui/icons-material';
import { getAllPersons } from '../../services/personService';
import ConfirmAlert from '../Material-UI/ConfirmAlert.jsx';

export default function ListPeople() {
    const [people, setPeople] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect( () => {
        getPeople()
    },[]);

    const getPeople = async () => {
        const data = await getAllPersons();
        setPeople(data);
    }

    const deletePerson = async (deleteId) => {
        try {
            
        } catch (error) {
                   
        }
    }

    return (
        <Box pt={2}>
            <Container maxWidth="xl" sx={{py:2, backgroundColor: grey[300]}}>
                <Grid container>
                    <Grid container item xs={12} pb={2} alignItems="flex-end" justifyContent="flex-end">
                        <Button variant="contained" size="large" startIcon={<AddBox />} component={Link} to="/app/people/create">Agregar Persona</Button>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow align="center">
                                    <TableCell>Rut</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {people.map((person) => (
                                <TableRow
                                    key={person.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{person.rut}</TableCell>
                                    <TableCell>{person.name}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                    <TableCell>{person.TypePerson.description}</TableCell>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Button component={Link} to={`/app/people/edit/${person.id}`} variant="contained" size="sm" color="warning"><Edit/></Button>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Button variant="contained" size="sm" color="error" onClick={() => {setConfirmOpen(true); setDeleteId(person.id)}}><Delete/></Button>
                                            </Grid>
                                        </Grid>   
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
            <ConfirmAlert 
                title="¿Está seguro que desea eliminar esta persona?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={deletePerson(deleteId)}
            >
                La persona será completamente eliminada del sistema y sus registros no podrán volver a ser consultados
            </ConfirmAlert>
        </Box>
    )
}
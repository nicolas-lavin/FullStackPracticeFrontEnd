import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = process.env.REACT_APP_URI_BACKEND;

export default function ListPeople() {

    const [people, setPeople] = useState([]);

    useEffect( () => {
        getPeople()
    },[]);

    const getPeople = async () => {
        const res = await axios.get(URI+'/person');
        setPeople(res.data)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <TableCell>{person.type_person_id}</TableCell>
                    <TableCell>borrar - actualizar</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
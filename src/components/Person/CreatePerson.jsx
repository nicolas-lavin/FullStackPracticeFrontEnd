import { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { grey, lightBlue } from '@mui/material/colors';
import axios from 'axios';

export default function CreatePerson() {
    const [typePerson, setTypePerson] = useState('');

    const [typesPeople, setTypesPeople] = useState([]);

    const handleChange = (event) => {
        setTypePerson(event.target.value);
    };

    useEffect(() => {
        getTypesPeople();
    },[]);

    const getTypesPeople = async () => {
        const res = await axios.get(process.env.REACT_APP_URI_BACKEND+'/types/person');
        setTypesPeople(res.data);
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { my:1, width: '100%' }, 
                pt:2,
            }}
            noValidate
            autoComplete="off"
        >
            <Container maxWidth="sm" sx={{bgcolor: grey[200]}}>
                <Grid container>
                    <Grid container item xs={12} pt={2} alignItems="center" justifyContent="center">
                        <Typography variant="h5" gutterBottom component="div" sx={{color: lightBlue[900]}}>
                            Añadir una Persona
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="rut_persona" label="Rut" variant="standard"/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="nombre_persona" label="Nombre" variant="standard"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="correo_persona" label="Correo" variant="standard"/>
                    </Grid>  
                    <Grid item xs={12}> 
                        <TextField id="telefono_persona" label="Teléfono" variant="standard"/> 
                    </Grid> 
                    <Grid item xs={12} pt={1}>
                        <Select
                            labelId="tipo_persona_label"
                            id="tipo_persona"
                            value={typePerson}
                            onChange={handleChange}
                            autoWidth
                            label="Tipo Persona"
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value=""><em>Seleccione un tipo</em></MenuItem>
                            {typesPeople.map(type => (
                                <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid container item xs={12} py={2} alignItems="flex-end" justifyContent="flex-end">
                        <Button variant="contained" size="large" endIcon={<Send />}>Enviar</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>            
    )
}

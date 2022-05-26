import { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { grey, lightBlue } from '@mui/material/colors';
import axios from 'axios';

export default function CreatePerson() {

    const [typesPeople, setTypesPeople] = useState([]);
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        getTypesPeople();
    },[]);

    const getTypesPeople = async () => {
        const res = await axios.get(process.env.REACT_APP_URI_BACKEND+'/types/person');
        setTypesPeople(res.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(process.env.REACT_APP_URI_BACKEND+'/person',formData)
        .then((response) =>{
            alert(response.data.message);
        }).catch((error) =>{
            alert(error.response.data.message);
        });
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
            onSubmit={handleSubmit}
        >
            <Container maxWidth="sm" sx={{bgcolor: grey[200]}}>
                <Grid container>
                    <Grid container item xs={12} pt={2} alignItems="center" justifyContent="center">
                        <Typography variant="h5" gutterBottom component="div" sx={{color: lightBlue[900]}}>
                            Añadir una Persona
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name="rut" label="Rut" variant="standard" onChange={handleChange}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name="name" label="Nombre" variant="standard" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="email" label="Correo" variant="standard" onChange={handleChange}/>
                    </Grid>  
                    <Grid item xs={12}> 
                        <TextField name="phone" label="Teléfono" variant="standard" onChange={handleChange}/> 
                    </Grid> 
                    <Grid item xs={12} pt={1}>
                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <InputLabel id="tipo_persona_label">Tipo de persona</InputLabel>
                            <Select
                                labelId="tipo_persona_label"
                                name="type_person_id"
                                value={formData.type_person_id || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>Seleccione un tipo</em></MenuItem>
                                {typesPeople.map(type => (
                                    <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} py={2} alignItems="flex-end" justifyContent="flex-end">
                        <Button type="submit" variant="contained" size="large" endIcon={<Send />}>Enviar</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>            
    )
}

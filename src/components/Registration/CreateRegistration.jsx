import { useState } from 'react';
import { Alert, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function CreateRegistration() {
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(process.env.REACT_APP_URI_BACKEND+'/registration',formData)
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
            <Container maxWidth="md">
                <Grid container>
                    <Grid container item xs={12} pb={2} alignItems="center" justifyContent="center">
                        <Typography variant="h6" gutterBottom component="span">A CONTINUACIÓN INGRESE EL RUT DE LA PERSONA A REGISTRAR</Typography>
                    </Grid>
                    <Grid container py={2} alignItems="center" justifyContent="center">
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <TextField name="rut" label="Rut" placeholder="EJ: 20.243.554-0" variant="standard" onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={2}/>
                    </Grid>
                    <Grid container item xs={12} py={2} alignItems="center" justifyContent="center">
                        <Alert severity="info">Info: El rut debe estar previamente registrado en el apartado de "Administrar Personas"</Alert>
                    </Grid>
                    <Grid container item xs={12} py={2} alignItems="center" justifyContent="center">
                        <Button type="submit" variant="contained" size="large" color="primary" >Guardar Ingreso</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>            
    )
}

import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

export default function CreatePerson() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <form>
                <Container maxWidth="sm" sx={{bgcolor: grey[300]}}>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <TextField id="rut_persona" label="Rut" variant="standard" sx={{ width: '100%' }}/>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField id="nombre_persona" label="Nombre" variant="standard" sx={{ width: '100%' }}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField id="correo_persona" label="Correo" variant="standard" sx={{ width: '100%' }}/>
                        </Grid>  
                        <Grid item xs={12} md={8}> 
                            <TextField id="telefono_persona" label="Teléfono" variant="standard" sx={{ width: '100%' }}/> 
                        </Grid> 
                        <Grid item xs={12}>
                            <Select
                                labelId="tipo_persona_label"
                                id="tipo_persona"
                                value={age}
                                onChange={handleChange}
                                autoWidth
                                label="Tipo Persona"
                                sx={{ width: '100%' }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Twenty</MenuItem>
                                <MenuItem value={21}>Twenty one</MenuItem>
                                <MenuItem value={22}>Twenty one and a half</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" size="large" endIcon={<Send />}>Enviar</Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Box>            
    )
}

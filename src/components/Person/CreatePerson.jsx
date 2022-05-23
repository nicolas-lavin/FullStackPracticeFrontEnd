import React from 'react';
import { Button, Card, CardActions, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function CreatePerson() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Card sx={{ m:3, width: 1500, maxHeight: 870, justifyContent:'center'}}>
            <CardContent>
                <FormControl fullWidth>
                    <TextField id="rut_persona" label="Rut" variant="standard"/>

                    <TextField id="nombre_persona" label="Nombre" variant="standard" sx={{mt:1}}/>

                    <TextField id="correo_persona" label="Correo" variant="standard" sx={{mt:1}} />

                    <TextField id="telefono_persona" label="Teléfono" variant="standard" sx={{mt:1}}/> 
                </FormControl>
                <FormControl sx={{ minWidth: 370, mt:2}}>
                    <InputLabel id="tipo_persona_label">Tipo Persona</InputLabel>
                    <Select
                        labelId="tipo_persona_label"
                        id="tipo_persona"
                        value={age}
                        onChange={handleChange}
                        autoWidth
                        label="Tipo Persona"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
            <CardActions sx={{ justifyContent: 'right'}}>
                <Button variant="contained" size="large" endIcon={<Send />}>Enviar</Button>
            </CardActions>
        </Card>
    )
}

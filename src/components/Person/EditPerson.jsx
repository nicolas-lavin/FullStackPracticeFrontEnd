import { useState, useEffect} from 'react';
import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { grey, lightBlue } from '@mui/material/colors';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function EditPerson() {

    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [typesPeople, setTypesPeople] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getPerson(id);
        getTypesPeople();
    },[id]);

    const getTypesPeople = async () => {
        const res = await axios.get(process.env.REACT_APP_URI_BACKEND+'/types/person');
        setTypesPeople(res.data);
    }

    const getPerson = async (id) => {
        const res = await axios.get(process.env.REACT_APP_URI_BACKEND+'/person/'+id);
        setFormData(res.data.data);
    }

    const onSubmit = async (formData) => {
        await axios.put(process.env.REACT_APP_URI_BACKEND+'/person/'+id,formData)
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
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container maxWidth="sm" sx={{bgcolor: grey[200]}}>
                <Grid container>
                    <Grid container item xs={12} pt={2} alignItems="center" justifyContent="center">
                        <Typography variant="h5" gutterBottom component="div" sx={{color: lightBlue[900]}}>
                            Editar Persona
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name="rut" label="Rut" variant="standard" value={formData.rut || ''}
                            {...register("rut", {
                                required: {
                                    value: true,
                                    message: "El rut es requerido"
                                }
                            })}
                        />
                        {errors.rut && <FormHelperText error={true}>{errors.rut.message}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name="name" label="Nombre" variant="standard" value={formData.name || ''}
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "El nombre de la persona es requerido"
                                },
                                pattern:{
                                    value: /^[A-Za-z ]+$/i,
                                    message: "El nombre de la persona es invalido"
                                }
                            })}
                        />
                        {errors.name && <FormHelperText error={true}>{errors.name.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="email" label="Correo" variant="standard" value={formData.email || ''}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "La dirección de correo electrónico es requerida"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "La dirección de correo electrónico es inválida"
                                }
                            })}
                        />
                        {errors.email && <FormHelperText error={true}>{errors.email.message}</FormHelperText>}
                    </Grid>  
                    <Grid item xs={12}> 
                        <TextField name="phone" label="Teléfono" variant="standard"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "El número de teléfono es requerido"
                                },
                                minLength: {
                                    value: 9,
                                    message: "El número de teléfono debe contener a lo menos 9 dígitos"
                                },
                            })}
                        /> 
                        {errors.phone && <FormHelperText error={true}>{errors.phone.message}</FormHelperText>}
                    </Grid> 
                    <Grid item xs={12} pt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="tipo_persona_label">Tipo de persona</InputLabel>
                            <Select
                                labelId="tipo_persona_label"
                                name="type_person_id"
                                defaultValue=""
                                {...register("type_person_id", {
                                    required: {
                                        value: true,
                                        message: "El tipo de persona es requerido"
                                    },
                                })}
                            >
                                <MenuItem value=""><em>Seleccione un tipo</em></MenuItem>
                                {typesPeople.map(type => (
                                    <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                                ))}
                            </Select>
                            {errors.type_person_id && <FormHelperText error={true}>{errors.type_person_id.message}</FormHelperText>}
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
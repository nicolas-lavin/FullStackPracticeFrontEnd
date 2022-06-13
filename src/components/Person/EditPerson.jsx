import { useState, useEffect } from 'react';
import { Alert, Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { grey, lightBlue } from '@mui/material/colors';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import formPersonValidations from './validations/FormPerson';
import {formatterRut} from '../../libs/chileanRutValidations';
import { updatePerson } from '../../services/personService';

export default function EditPerson() {

    const { id } = useParams();
    const [initValues, setInitValues] = useState({});
    const [initAlert, setAlert] = useState({});
    const [typesPeople, setTypesPeople] = useState([]);

    useEffect(() => {
        getPerson(id);
        getTypesPeople();
    }, [id]);

    const getTypesPeople = async () => {
        const { data } = await axios.get(process.env.REACT_APP_URI_BACKEND + '/types/person');
        setTypesPeople(data);
    }

    const getPerson = async (id) => {
        const { data } = await axios.get(process.env.REACT_APP_URI_BACKEND + '/person/' + id);
        setInitValues({
            rut: data.data.rut,
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            type_person_id: data.data.type_person_id,
        });
    }

    const handleCloseAlert = () => setAlert({});

    return (
        <>
            <Formik
                initialValues={initValues}
                validationSchema={formPersonValidations}
                onSubmit={async (formData) => {
                    const res = await updatePerson(id, formData);
                    setAlert({severity: res.status, menssage: res.message});
                }}
                enableReinitialize={true}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue}) => (
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { my: 1, width: '100%' }, pt: 2 }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Container maxWidth="sm" disableGutters={true}>
                            <Grid item pb={2}>
                                {initAlert.menssage && <Alert onClose={handleCloseAlert} severity={initAlert.severity}>{initAlert.menssage}</Alert>}
                            </Grid>
                        </Container>
                        <Container maxWidth="sm" sx={{ bgcolor: grey[200] }}> 
                            <Grid container>
                                <Grid container item xs={12} pt={2} alignItems="center" justifyContent="center">
                                    <Typography variant="h5" gutterBottom component="div" sx={{ color: lightBlue[900] }}>
                                        Editar Persona
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="rut" label="Rut" variant="standard" value={values.rut || ''} onChange={(e) => {handleChange(e); setFieldValue('rut', formatterRut(e.target.value));}} onBlur={handleBlur} error={touched.rut && Boolean(errors.rut)} helperText={touched.rut && errors.rut} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="name" label="Nombre" variant="standard" value={values.name || ''} onChange={handleChange} onBlur={handleBlur} error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="email" label="Correo" variant="standard" value={values.email || ''} onChange={handleChange} onBlur={handleBlur} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="phone" label="Teléfono" variant="standard" value={values.phone || ''} onChange={handleChange} onBlur={handleBlur} error={touched.phone && Boolean(errors.phone)} helperText={touched.phone && errors.phone} />
                                </Grid>
                                <Grid item xs={12} pt={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="tipo_persona_label">Tipo de persona</InputLabel>
                                        <Select
                                            labelId="tipo_persona_label"
                                            name="type_person_id"
                                            defaultValue=""
                                            value={values.type_person_id || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.type_person_id && Boolean(errors.type_person_id)} 
                                        >
                                            <MenuItem value=""><em>Seleccione un tipo</em></MenuItem>
                                            {typesPeople.map(type => (
                                                <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched.type_person_id && errors.type_person_id && <FormHelperText error="true">{errors.type_person_id}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={12} py={2} alignItems="flex-end" justifyContent="flex-end">
                                    <Button type="submit" variant="contained" size="large" endIcon={<Send />}>Enviar</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                )}
            </Formik>
        </>
    )
}
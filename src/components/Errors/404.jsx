import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>404 - Pagina no encontrada!</h1>
            <Button component={Link} to="/" key="Inicio" variant="contained" size="small">Inicio</Button>
        </div> 
    )
}
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant='h6'>
                        navbar
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

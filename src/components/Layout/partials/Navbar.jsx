import { useState }from 'react';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,Container,Avatar,Button,Tooltip,MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import NavbarLogo from '../../../assets/images/logo_duoc.png';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { userLogout } from '../../../services/authService';

const pages = [
    {name: 'Inicio', to: '/'}, 
    {name: 'Ingreso Registro', to:'/registration/create'}, 
    {name: 'Registros', to:'/registrations'},
    {name: 'Administrar Personas', to:'/people'}
];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            await userLogout();
            navigate("/login/sign-in");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <AppBar position="sticky" sx={{ bgcolor: grey[900]}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                        <Link to="/">
                            <img src={NavbarLogo} alt="logo_duoc" width="169" height="75"/>
                        </Link>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map((page) => (
                                <MenuItem component={Link} to={page.to} key={page.name} onClick={handleCloseNavMenu} >
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                <Box sx={{display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                    <img
                        src={NavbarLogo}
                        alt="logo_duoc"
                        width="169" 
                        height="75"
                    />           
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        component={NavLink}
                        to={page.to}
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
                    >
                        {page.name}
                    </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="Logout" onClick={handleLogout}>
                            <Typography textAlign="center">Cerrar Sesión</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

import { ThemeProvider, Typography } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import themeMain from './config/themeMain';

function App() {
  return (
    <div>
      <ThemeProvider theme={themeMain}>
        <Navbar></Navbar>
        <Typography>HOLA</Typography>
      </ThemeProvider>
    </div>
    
  );
}

export default App;

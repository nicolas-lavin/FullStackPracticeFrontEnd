import { Container, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import StickyFooter from './components/StickyFooter.jsx';
import themeMain from './config/themeMain';

function App() {
  return (
    <div>
      <ThemeProvider theme={themeMain}>
        <Navbar></Navbar>
        <Container maxWidth="sm">Hoal</Container>
        <StickyFooter></StickyFooter>
      </ThemeProvider>
    </div>
    
  );
}

export default App;

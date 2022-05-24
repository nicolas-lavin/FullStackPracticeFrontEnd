import { Box, ThemeProvider} from '@mui/material';
import Navbar from './components/Navbar.jsx';
import StickyFooter from './components/StickyFooter.jsx';
import themeMain from './config/themeMain';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreatePerson from './components/Person/CreatePerson.jsx';
import ListPeople from './components/Person/ListPeople.jsx';

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <Router>
        <Box>
            <Navbar></Navbar>
            <Routes>
              <Route exact path="/people" element={<ListPeople/>} />
              <Route exact path="/people/create" element={<CreatePerson/>} />
            </Routes>
            <StickyFooter></StickyFooter>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

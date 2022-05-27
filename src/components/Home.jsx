import { Box, Container } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function Home() {
    return (
        <Box>
            <Container maxWidth="sm" sx={{bgcolor: grey[200]}}>
                <h1>Home</h1>
            </Container>
        </Box>            
    )
}
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MyPage() {
  return (
    <Container sx={{ mt: 10, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          mb: 4,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          My Page
        </Typography>
        <Typography variant="body1" align="center">
          Welcome to your personal page!
        </Typography>
      </Box>
    </Container>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ setPrompt, prompt, placeholder }) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, w: "50ch" } }}
      noValidate
      autoComplete="off"
      className='w-full'
    >
      <TextField id="outlined-basic" label={placeholder} variant="outlined"
        onChange={(e) => setPrompt(e.target.value)} value={prompt} />
    </Box>
  );
}

// AIzaSyBj451WJaQpBIAbQg-8gY89L-1RdUtATAE
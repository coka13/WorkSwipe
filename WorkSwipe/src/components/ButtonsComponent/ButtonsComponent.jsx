import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({text}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text" sx={{ fontWeight: "bold", border: "1px solid #1976D2" }}>{text}</Button>
    </Stack>
  );
}

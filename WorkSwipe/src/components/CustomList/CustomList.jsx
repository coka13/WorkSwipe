import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BasicButtons from '../BasicButtons/BasicButtons';
import "./CustomList.css"

export default function CustomList({ items, dispatchFunc }) {
  const handleOnClick = (item) => {
    dispatchFunc(item)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText primary={item} />
            <BasicButtons text={"delete"} onClick={() => handleOnClick(item)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
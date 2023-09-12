import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = useState('');
  const [objetives, setObjetives] = useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI1MDAxNTAyOCwiYWFpIjoxMSwidWlkIjo0MTk2MTI0MSwiaWFkIjoiMjAyMy0wNC0xMVQwOTowODoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTI0NzU5NDUsInJnbiI6InVzZTEifQ.1doO0p1Aaj6gBqAZGfws9Tj4lUhlpC3tA-9Ke44XA5o';

    fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY,
        'API-Version': '2023-04'
      },
      body: JSON.stringify({
        'query': 'query {boards (ids: 5107824201) {groups {title id}}}'
      })
    })
      .then(response => response.json())
      .then(data => {
        // Aquí guardamos los datos en la variable boardData.
        setObjetives(data.data.boards[0].groups);
        console.log(data.data.boards[0].groups);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <>
    {objetives ? (
      <Box sx={{}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{}}>Objetives Groups</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            
            {objetives.map(group => (
                <MenuItem key={group.id} value={group.id}>
                  {group.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    ) : (
      <div>Loading...</div>
    )}
    </>
    
  );
}
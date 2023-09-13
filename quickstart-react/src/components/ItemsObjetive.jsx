import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Bu from './Bu';

export default function ItemsObjetive(props) {
const groupId = props;

  
  const [groupItems, setGroupItems] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    console.log('GroupID',groupId)
    const API_KEY = process.env.REACT_APP_API_KEY;
    const query = `query {boards (ids: 5107824201) {groups (ids: ${groupId.groupId}) {items {name id }}}}`;
    console.log('Query',query)

    fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY,
        'API-Version': '2023-04'
      },
      body: JSON.stringify({
        'query': query})
    })
      .then(response => response.json())
      .then(data => {
        // Aquí guardamos los datos en la variable boardData.
        setGroupItems(data.data.boards[0].groups[0].items);
        setIsLoading(false);
        console.log('Data',data)
        console.log('setGroupItems',data.data.boards[0].groups[0].items);
      })
      .catch(error => {
        setError('Error al obtener datos. Por favor, inténtalo de nuevo más tarde.');
        setIsLoading(false);
        console.error('Error al obtener datos:', error);
      });
  }, [groupId]);

  return (
    <>
    {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
        <p></p>
        <Box sx={{}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{}}>Objetives</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={itemSelected}
              label="Group"
              onChange={(event) => setItemSelected(event.target.value)}
            >
              {groupItems.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  <div>
                    {item.name}
                  </div>
                  
                  <div>
                    status: lo q sea
                  </div>
                  
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        </>
        
      )}
      {/* <ItemsObjetive groupId={selectedGroupId} /> */}
      {itemSelected ?(
        <Bu bussinesUnit = {itemSelected}/>
      ):(
        <>Seleccione un Objetive</>
      ) }
    </>
    
  );
}
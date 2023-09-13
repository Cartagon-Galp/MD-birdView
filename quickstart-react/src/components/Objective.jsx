import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ItemsObjetive from './ItemsObjetive';
import { queryMonday } from './functions';

export default function BasicSelect() {
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [objetives, setObjetives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = 'query {boards (ids: 5107824201) {groups {title id}}}';
  
    queryMonday(query)
      .then(data => {
        setObjetives(data.data.boards[0].groups);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error al obtener datos. Por favor, inténtalo de nuevo más tarde.');
        setIsLoading(false);
      });
  }, []);
  const handleSelectChange = (event) => {
    setSelectedGroupId(event.target.value);
  };

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
              <InputLabel id="demo-simple-select-label" sx={{}}>Objetives Groups</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedGroupId}
                label="Group"
                onChange={handleSelectChange}
              >
                {objetives.map(group => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}
      {selectedGroupId ? (
        <ItemsObjetive groupId={selectedGroupId} />
      ) : (
        <>Seleccione un Grupo de Objetives</>
      )}
    </>
  );
}
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import ItemsObjetive from './ItemsObjetive';

// export default function BasicSelect() {
//   const [age, setAge] = useState('');
//   const [objetives, setObjetives] = useState(null);
//   const [objetivesItems, setObjetivesItems] = useState(null);

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   useEffect(() => {
//     // Tu API Key debería estar en un lugar seguro, no en el código fuente.
//     const API_KEY = process.env.REACT_APP_API_KEY;

//     fetch("https://api.monday.com/v2", {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': API_KEY,
//         'API-Version': '2023-04'
//       },
//       body: JSON.stringify({
//         'query': 'query {boards (ids: 5107824201) {groups {title id}}}'
//       })
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Aquí guardamos los datos en la variable boardData.
//         setObjetives(data.data.boards[0].groups);
//         console.log(data.data.boards[0].groups);
//       })
//       .catch(error => {
//         console.error('Error al obtener datos:', error);
//       });
//   }, []);

//   return (
//     <>
//     {objetives ? (
//       <Box sx={{}}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label" sx={{}}>Objetives Groups</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={objetivesItems}
//             label="Group"
//             onChange={handleChange}
//           >

//             {objetives.map(group => (
//                 <MenuItem key={group.id} value={group.id}>
//                   {group.title}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//       </Box>
//     ) : (
//       <div>Loading...</div>
//     )}
//     <ItemsObjetive/>
//     </>

//   );
// }


import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ItemsObjetive from './ItemsObjetive';

export default function BasicSelect() {
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [objetives, setObjetives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

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
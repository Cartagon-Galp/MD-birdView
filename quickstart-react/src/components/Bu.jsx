import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Bu(props) {
    const bU = props;


    const [items, setItems] = useState(null);
    const [itemSelected, setItemSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    


    useEffect(() => {
        // Tu API Key debería estar en un lugar seguro, no en el código fuente.
        console.log('bU', bU)
        const API_KEY = process.env.REACT_APP_API_KEY;
        // const query = `query {boards (ids: 5107824201) {groups (ids: ${groupId.groupId}) {items {name id }}}}`;
        const query = `query{
        items(ids:${bU.bussinesUnit}){
          name
          id
          column_values{
            value
            text
          }
        }
      }`
        console.log('Query', query)

        fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
                'API-Version': '2023-04'
            },
            body: JSON.stringify({
                'query': query
            })
        })
            .then(response => response.json())
            .then(data => {
                // Aquí guardamos los datos en la variable boardData.

                setItems(data.data.items[0].column_values);
                setIsLoading(false);
                console.log('Data', data)
                console.log('setItems', data.data.items[0].column_values);
            })
            .catch(error => {
                setError('Error al obtener datos. Por favor, inténtalo de nuevo más tarde.');
                setIsLoading(false);
                console.error('Error al obtener datos:', error);
            });
    }, [bU]);

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
                            <InputLabel id="demo-simple-select-label" sx={{}}>Bussines Unit</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={itemSelected}
                                label="Group"
                                onChange={(event) => setItemSelected(event.target.value)}
                            >
                                {items.map(item => {
                                    if (item.value) {

                                        console.log('item en primer if',item.value)
                                        console.log('Type de item.value',typeof item.value)
                                        const itemValueJSON = JSON.parse(item.value);
                                        console.log('itemValueJSON',itemValueJSON)
                                        console.log('Type of itemValueJSON',typeof itemValueJSON)

                                        if (itemValueJSON.linkedPulseIds) {

                                            console.log('item.text en segundo if',item.text)
                                            const textArray = item.text.split(',');
                                            console.log('item en segundo if', itemValueJSON.linkedPulseIds);
                                            console.log('Type de item en segundo if', typeof itemValueJSON.linkedPulseIds);
                                            return itemValueJSON.linkedPulseIds.map((linkedpulse,index) => (
                                              <MenuItem key={linkedpulse.linkedPulseId} value={linkedpulse.linkedPulseId}>
                                                {linkedpulse.linkedPulseId}, ---- {textArray[index]}
                                              </MenuItem>
                                            ));
                                          }
                                        }
                                        return null; // Retorna null para excluir elementos sin valor
                                      })}

                            </Select>
                        </FormControl>
                    </Box>
                </>

            )}
            {/* <ItemsObjetive groupId={selectedGroupId} /> */}
        </>

    );
}
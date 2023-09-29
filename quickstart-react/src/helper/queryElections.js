import { queryMonday } from "./functions";

export const queryElections = async (id) => {
  const query = `query 
    {boards (ids: 5107824201) 
      {groups (ids: ${id}) 
      {items 
        {name 
          id }
        }
      }
    }`;

  try {
    const data = await queryMonday(query);
    const result = data.data.boards[0].groups[0].items;
    // console.log(result);

    // Realizar otra consulta utilizando el resultado de la primera
    const queries = result.map((item) => {
      return queryMonday(`query {
	  boards (ids: 5107824201) {
      items (ids:${item.id}) {
        column_values {
          value
          text
          }
        }
	    }
    }`);
    });

    const otherResults = await Promise.all(queries);

    // otherResults contendrá los resultados de todas las consultas secundarias
    // console.log(otherResults);
    result.push(otherResults);
    // console.log(result[result.length - 1]);

    return result; // Opcional: puedes devolver el resultado original si es necesario
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const queryElectionBu = async (buElection) => {
  try {
    const queries = buElection.map((id) => {
      return queryMonday(`query{
          items(ids:${id}){
            column_values(ids:connect_boards){
              value
              text
            }
          }
        }`);
    });

    const initiativeResults = await Promise.all(queries);
    const initiativeData = initiativeResults.map((item) => {
      return item.data;
    });
    const initiativeItems = initiativeData.map((item) => {
      return item.items;
    });
    const initiativeItems2 = initiativeItems.map((item) => {
      return item[0].column_values;
    });
    // console.log(initiativeItems2);
    let json = [];
    const initiativeItems3 = initiativeItems2.map((item) => {
      if (item[0].value) {
        json.push(JSON.parse(item[0].value));
      }
      return json;
    });
    // console.log(initiativeItems3);
    let json2 = [];

    initiativeItems3.map((item) => {
      item.map((item) => {
        json2.push(item);
      });
    });
    // console.log(json2);
    let json3 = [...new Set(json2)];
    // console.log(json3);
    const initiativeItems4 = json3.map((item) => item.linkedPulseIds);
    // console.log(initiativeItems4);

    let json4 = [];
    initiativeItems4.map((item) => {
      item.map((item) => json4.push(item.linkedPulseId));
    });

    return json4;
  } catch (error) {
    console.log(error);
  }
};

export const fetchInitiative = async (array) => {
  const promises = array.map(async (id) => {
    const query = `query{
          items(ids:${id}){
            name
            id
            column_values(ids:connect_boards){
              value
              text
            }
          }
        }`;

    try {
      const response = await queryMonday(query);
      return response.data.items[0].column_values;
    } catch (error) {
      console.log(
        "Error al obtener datos. Por favor, inténtalo de nuevo más tarde."
      );
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results;
};

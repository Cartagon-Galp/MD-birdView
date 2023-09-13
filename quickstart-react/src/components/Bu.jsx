import * as React from "react";
import { useEffect, useState } from "react";
import { queryMonday } from "./functions";
import { AiOutlineCheck } from "react-icons/ai";

export default function Bu(props) {
  const bU = props;

  const [items, setItems] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    const query = `query{
          items(ids:${bU.bussinesUnit}){
            name
            id
            column_values{
              value
              text
            }
          }
        }`;

    queryMonday(query)
      .then((data) => {
        // Aquí guardamos los datos en la variable boardData.
        setItems(data.data.items[0].column_values);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "Error al obtener datos. Por favor, inténtalo de nuevo más tarde."
        );
      });
  }, [bU]);

  const handleSelectChange = (index) => {
    setActiveButtonIndex(index);
    setItemSelected(index);
    console.log(
      "// En setItemSelected del archivo Bu.jsx le he metido linkedpulse.linkedPulse, para que le eches un vistazo"
    );
  };

  // En setItemSelected del archivo Bu.jsx le he metido linkedpulse.linkedPulse, para que le eches un vistazo

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="button-container">
            {items.map((item) => {
              if (item.value) {
                const itemValueJSON = JSON.parse(item.value);
                if (itemValueJSON.linkedPulseIds) {
                  const textArray = item.text.split(",");
                  return itemValueJSON.linkedPulseIds.map(
                    (linkedpulse, index) => (
                      <button
                        key={linkedpulse.linkedPulseId}
                        onClick={() =>
                          handleSelectChange(linkedpulse.linkedPulseId)
                        }
                        className="button blue"
                        style={{
                          backgroundColor:
                            activeButtonIndex === linkedpulse.linkedPulseId
                              ? "rgba(112, 226, 255, 0.7)"
                              : "white",
                          color:
                            activeButtonIndex === linkedpulse.linkedPulseId &&
                            "white",
                        }}
                      >
                        <div className="left">
                          <AiOutlineCheck />
                        </div>
                        <div className="right">
                          {linkedpulse.linkedPulseId}, ---- {textArray[index]}.
                        </div>
                      </button>
                    )
                  );
                }
              }
              return null; // Retorna null para excluir elementos sin valor
            })}
          </div>
        </>
      )}
      {/* <ItemsObjetive groupId={selectedGroupId} /> */}
    </>
  );
}

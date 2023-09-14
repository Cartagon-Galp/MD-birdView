import * as React from "react";
import { useEffect, useState } from "react";
import { queryMonday } from "./functions";
import { IoIosCalculator } from "react-icons/io";
import { Arrow } from "./Arrow";

export const Initiatives = ({
  buSelected,
  isInVisible,
  bussinesUnit,
  groupId,
}) => {
  const [items, setItems] = useState(null);
  const [itemInSelected, setItemInSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    const query = `query{
          items(ids:${buSelected}){
            name
            id
            column_values(ids:connect_boards){
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
  }, [buSelected]);

  useEffect(() => {
    setTimeout(() => setActiveButtonIndex(null), 300);
  }, [buSelected, bussinesUnit, groupId]);

  if (!items) {
    return <div>Loading...</div>;
  }

  const handleSelectChange = (index) => {
    setActiveButtonIndex(index);
    setItemInSelected(index);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        isInVisible && (
          <>
            <div className="button-container">
              {items.map((item) => {
                if (item.value) {
                  const jsonData = JSON.parse(item.value);
                  if (jsonData.linkedPulseIds) {
                    const textArray = item.text.split(",");
                    return jsonData.linkedPulseIds.map((dato, i) => (
                      <button
                        key={dato.linkedPulseId}
                        onClick={() => handleSelectChange(dato.linkedPulseId)}
                        className="button red"
                        style={{
                          backgroundColor:
                            activeButtonIndex === dato.linkedPulseId
                              ? "rgba(247, 59, 59, 0.7)"
                              : "white",
                          color:
                            activeButtonIndex === dato.linkedPulseId && "white",
                        }}
                      >
                        <div className="left">
                          <IoIosCalculator />
                        </div>
                        <div className="right">
                          {dato.linkedPulseId}, ---- {textArray[i]}.
                        </div>
                        <div className="arrow">
                          {activeButtonIndex === dato.linkedPulseId && (
                            <Arrow color="rgba(247, 59, 59, 0.7)" />
                          )}
                        </div>
                      </button>
                    ));
                  }
                }
                return null; // Retorna null para excluir elementos sin valor
              })}
            </div>
          </>
        )
      )}
      {/* {itemBuSelected ? (
        <Initiatives buSelected={itemBuSelected} />
      ) : (
        <>Seleccione un Objetive</>
      )} */}
    </>
  );
};

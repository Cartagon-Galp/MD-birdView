import * as React from "react";
import { useEffect, useState } from "react";
import Bu from "./Bu";
import { queryMonday } from "./functions";
import { VscChecklist } from "react-icons/vsc";

export default function ItemsObjetive(props) {
  const groupId = props;

  const [groupItems, setGroupItems] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    const query = `query {boards (ids: 5107824201) {groups (ids: ${groupId.groupId}) {items {name id }}}}`;

    queryMonday(query)
      .then((data) => {
        // Aquí guardamos los datos en la variable boardData.
        setGroupItems(data.data.boards[0].groups[0].items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "Error al obtener datos. Por favor, inténtalo de nuevo más tarde."
        );
      });
  }, [groupId]);

  const handleSelectChange = (index) => {
    setActiveButtonIndex(index);
    setItemSelected(index);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="button-container">
            {groupItems.map((item) => (
              <button
                key={item.id}
                value={item.id}
                className="button green"
                style={{
                  backgroundColor:
                    activeButtonIndex === item.id
                      ? "rgba(10, 199, 10, 0.5)"
                      : "white",
                  color: activeButtonIndex === item.id && "white",
                }}
                onClick={() => handleSelectChange(item.id)}
              >
                <div className="left">
                  <VscChecklist />
                </div>
                <div className="right">{item.name}</div>
              </button>
            ))}
          </div>
        </>
      )}
      {/* <ItemsObjetive groupId={selectedGroupId} /> */}
      {itemSelected ? (
        <Bu bussinesUnit={itemSelected} />
      ) : (
        <>Seleccione un Objetive</>
      )}
    </>
  );
}

import { AiOutlineCheck } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { queryMonday } from "../helper/functions";
import { fetchInitiative } from "../helper/queryElections";

export const Bu2 = ({
  activeButtonIndex,
  setActiveButtonIndex,
  setArrayBu,
  setElection,
  tree,
  setTree,
  setArrayBuElection,
  secondStep,
  setSecondStep,
  setThirdStep,
}) => {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    const query = `query {
	  boards (ids: 5107824201) {
      items {
        id
        name
        column_values {
          value
          text
          }
        }
	    }
    }`;
    queryMonday(query)
      .then((data) => {
        // Aquí guardamos los datos en la variable boardData.
        setItems(data.data.boards[0].items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "Error al obtener datos. Por favor, inténtalo de nuevo más tarde."
        );
      });
  }, []);

  const buSearch = [];

  // Manejador cuando carga la pantalla para que aparezca todos los ítems
  if (tree) {
    const cut = [...tree];
    const buOptions = cut.pop();
    const buOptions2 = buOptions.map(
      (option) => option.data.boards[0].items[0].column_values
    );
    buOptions2.map((group) =>
      group.map((value) => {
        if (value.value) {
          const jsonValue = JSON.parse(value.value);
          // console.log(jsonValue);
          if (jsonValue.linkedPulseIds) {
            // console.log(jsonValue.linkedPulseIds);
            jsonValue.linkedPulseIds.map((bu) => {
              // console.log(bu.linkedPulseId);
              buSearch.push(bu.linkedPulseId);
              // setArrayBuOption(buSearch);
            });
          }
        }
      })
    );
  }

  useEffect(() => {
    if (buSearch.length > 0) {
      setArrayBuElection(buSearch);
    } else {
      setArrayBuElection([]);
    }
  }, [tree]);

  const handleSelectChange = async (id) => {
    setTree(null);
    setElection(null);
    setSecondStep(null);
    setActiveButtonIndex(id);
    const data = await fetchInitiative([id]);

    const idsLast = [];

    data.map((item) => {
      item.map((item) => {
        if (item.value) {
          const jsonData = JSON.parse(item.value);
          if (jsonData.linkedPulseIds) {
            jsonData.linkedPulseIds.map((link) => {
              idsLast.push(link.linkedPulseId);
            });
          }
        }
      });
    });

    setThirdStep(idsLast);
  };

  const ids = [];
  useEffect(() => {
    if (items) {
      items.map((item) =>
        item.column_values.map((column) => {
          if (column.value) {
            const columnValue = JSON.parse(column.value);
            // console.log(columnValue);
            if (columnValue.linkedPulseIds) {
              columnValue.linkedPulseIds.map((id) =>
                ids.push(id.linkedPulseId)
              );
            }
          }
        })
      );
      setArrayBu(ids);
    }
  }, [items]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="button-container">
            {items.map((item) =>
              item.column_values.map((column) => {
                if (column.value) {
                  const columnValue = JSON.parse(column.value);
                  // console.log(columnValue);
                  if (columnValue.linkedPulseIds) {
                    const textArray = column.text.split(",");
                    // console.log(columnValue.linkedPulseIds, column.text);
                    return columnValue.linkedPulseIds.map(
                      (linkedPulseIds, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleSelectChange(linkedPulseIds.linkedPulseId)
                          }
                          className={`button blue-sea ${
                            activeButtonIndex ===
                              linkedPulseIds.linkedPulseId && "selected"
                          } ${
                            secondStep
                              ? secondStep.some(
                                  (option) =>
                                    option === linkedPulseIds.linkedPulseId
                                ) && "option"
                              : tree &&
                                buSearch.some(
                                  (option) =>
                                    option === linkedPulseIds.linkedPulseId
                                ) &&
                                "option"
                          }`}
                        >
                          <div className="left">
                            <AiOutlineCheck />
                          </div>
                          <div className="right">
                            {linkedPulseIds.linkedPulseId}
                          </div>
                        </button>
                      )
                    );
                  }
                }
              })
            )}
          </div>
        </>
      )}
    </>
  );
};

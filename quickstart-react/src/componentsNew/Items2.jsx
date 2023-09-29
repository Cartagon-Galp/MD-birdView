import { VscChecklist } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { queryMonday } from "../helper/functions";
import { fetchInitiative } from "../helper/queryElections";

export const Items2 = ({
  activeButtonIndex,
  setActiveButtonIndex,
  tree,
  setTree,
  setSecondStep,
  setElection,
  setSecondStepInitiative,
  setThirdStep,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [objetives, setObjetives] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `query
     {boards (ids: 5107824201)
       {items
         {name 
          id
          }
        }
      }`;

    queryMonday(query)
      .then((data) => {
        setObjetives(data.data.boards[0].items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "Error al obtener datos. Por favor, inténtalo de nuevo más tarde."
        );
        setIsLoading(false);
      });
  }, []);

  const handleSelectChange = (id) => {
    setTree(null);
    setElection(null);
    setSecondStep(null);
    // setSecondStepInitiative(null);
    setThirdStep(null);
    setActiveButtonIndex(id);

    let number = parseInt(id);
    let query = `query {
    items(ids: ${number}) {
      name
      id
      column_values {
        value
        text
      }
    }
  }`;

    queryMonday(query)
      .then((data) => {
        let ids = [];
        let idsInitiative = [];
        data.data.items[0].column_values.map((item) => {
          if (item.value) {
            const itemValueJSON = JSON.parse(item.value);
            if (itemValueJSON.linkedPulseIds) {
              itemValueJSON.linkedPulseIds.map((link) => {
                ids.push(link.linkedPulseId);
              });
            }
          }
        });
        setSecondStep(ids);

        // Llamar a fetchInitiative aquí, después de actualizar secondStep
        if (ids.length > 0) {
          fetchInitiative(ids)
            .then((initiativeData) => {
              initiativeData.map((item) => {
                item.map((item) => {
                  if (item.value) {
                    let jsonData = JSON.parse(item.value);
                    jsonData.linkedPulseIds.map((item) => {
                      idsInitiative.push(item.linkedPulseId);
                    });
                  }
                });
              });
              setSecondStepInitiative(idsInitiative);
            })
            .catch((error) => {
              console.error("Error al obtener datos de iniciativas:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Ocurrió un error");
      });
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
            {objetives.map((group, index) => (
              <button
                key={group.id}
                value={group.id}
                className={`button green-soft ${
                  activeButtonIndex === group.id && "selected"
                } ${
                  tree &&
                  tree.some((option) => option.id === group.id) &&
                  "option"
                }`}
                onClick={() => handleSelectChange(group.id)}
              >
                <div className="left">
                  <VscChecklist />
                </div>
                <div className="right">{group.id}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

import { IoIosCalculator } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { queryMonday } from "../helper/functions";
import { queryElectionBu } from "../helper/queryElections";

export const Initiative = ({
  activeButtonIndex,
  setActiveButtonIndex,
  setElection,
  setTree,
  arrayBu,
  arrayBuElection,
  setSecondStep,
  secondStepInitiative,
  setSecondStepInitiative,
  thirdStep,
  setThirdStep,
}) => {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [optionsInitiative, setOptionsInitiative] = useState(null);

  useEffect(() => {
    // Tu API Key debería estar en un lugar seguro, no en el código fuente.
    const fetchData = async () => {
      const promises = arrayBu.map(async (id) => {
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
          setError(
            "Error al obtener datos. Por favor, inténtalo de nuevo más tarde."
          );
          return null;
        }
      });

      const results = await Promise.all(promises);
      setItems(results);
      setIsLoading(false);
    };

    fetchData();
  }, [arrayBu]);

  const handleSelectChange = (id) => {
    setTree(null);
    setElection(null);
    setSecondStep(null);
    setSecondStepInitiative(null);
    setThirdStep(null);
    setActiveButtonIndex(id);
  };

  useEffect(() => {
    if (arrayBuElection) {
      queryElectionBu(arrayBuElection)
        .then((result) => {
          setOptionsInitiative(result);
        })
        .catch((error) => {
          console.log("Error al coger los resultados");
        });
    }
  }, [arrayBuElection]);

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
              let element = item[0];
              if (element.value) {
                let itemJSON = JSON.parse(element.value);
                // console.log(itemJSON.linkedPulseIds);
                if (itemJSON.linkedPulseIds) {
                  let itemText = element.text.split(",");
                  // console.log(itemText);
                  // console.log(itemJSON.linkedPulseIds);
                  return itemJSON.linkedPulseIds.map((element, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectChange(element.linkedPulseId)}
                      className={`button red ${
                        activeButtonIndex === element.linkedPulseId &&
                        "selected"
                      } ${
                        thirdStep
                          ? thirdStep.some(
                              (option) => option === element.linkedPulseId
                            ) && "option"
                          : secondStepInitiative
                          ? secondStepInitiative.some(
                              (option) => option === element.linkedPulseId
                            ) && "option"
                          : optionsInitiative &&
                            optionsInitiative.some(
                              (option) => option === element.linkedPulseId
                            ) &&
                            "option"
                      }`}
                    >
                      <div className="left">
                        <IoIosCalculator />
                      </div>
                      <div className="right">{element.linkedPulseId}</div>
                    </button>
                  ));
                }
              }
            })}
          </div>
        </>
      )}
      ;
    </>
  );
};

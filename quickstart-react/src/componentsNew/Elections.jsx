import { TbArticle } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { queryMonday } from "../helper/functions";
import { queryElections } from "../helper/queryElections";

export const Elections = ({
  activeButtonIndex,
  setActiveButtonIndex,
  setTree,
  setSecondStep,
  election,
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
       {groups
         {title 
          id
          }
        }
      }`;

    queryMonday(query)
      .then((data) => {
        setObjetives(data.data.boards[0].groups);
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
    setActiveButtonIndex(id);
    setElection(id);
    setSecondStep(null);
    setSecondStepInitiative(null);
    setThirdStep(null);
  };

  useEffect(() => {
    if (election) {
      // Llamamos a queryElections y manejamos la respuesta asíncronamente
      queryElections(election)
        .then((result) => {
          setTree(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [election]);

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
                className={`button purple ${
                  activeButtonIndex === group.id && "selected"
                }`}
                onClick={() => handleSelectChange(group.id, index)}
              >
                <div className="left">
                  <TbArticle />
                </div>
                <div className="right">{group.title}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

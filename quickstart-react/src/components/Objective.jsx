import { TbArticle } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { queryMonday } from "./functions";
import "../stylesheet/options.css";
import ItemsObjetive from "./ItemsObjetive";

export default function BasicSelect() {
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [objetives, setObjetives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  useEffect(() => {
    const query = "query {boards (ids: 5107824201) {groups {title id}}}";

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

  const handleSelectChange = (index) => {
    setActiveButtonIndex(index);
    setSelectedGroupId(index);
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
            {objetives.map((group) => (
              <button
                key={group.id}
                value={group.id}
                className="button yellow"
                style={{
                  backgroundColor:
                    activeButtonIndex === group.id
                      ? "rgba(255, 191, 54, 0.7)"
                      : "white",
                  color: activeButtonIndex === group.id && "white",
                }}
                onClick={() => handleSelectChange(group.id)}
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
      {selectedGroupId ? (
        <ItemsObjetive groupId={selectedGroupId} />
      ) : (
        <>Seleccione un Grupo de Objetives</>
      )}
    </>
  );
}

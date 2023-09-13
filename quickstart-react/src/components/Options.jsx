import { TbArticle } from "react-icons/tb";
import "../styleSheets/options.css";
import "../App.css";
import { useState } from "react";
import opcionesData from "../helper/opciones.json";
import OptionsSecond from "./OptionsSecond";

export const Options = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (opcion, index) => {
    setSelectedOption(opcion.nombre);
    setActiveButtonIndex(index);
  };

  return (
    <>
      <div className="button-container">
        {opcionesData.opciones.map((opcion) => (
          <button
            title="Expand this"
            key={opcion.id}
            className="button yellow"
            style={{
              backgroundColor:
                activeButtonIndex === opcion.id
                  ? "rgba(255, 191, 54, 0.7)"
                  : "white",
              color: activeButtonIndex === opcion.id && "white",
            }}
            onClick={() => handleButtonClick(opcion, opcion.id)}
          >
            <div className="left">
              <TbArticle />
            </div>
            <div className="right">{opcion.nombre}</div>
          </button>
        ))}
      </div>
      {selectedOption && (
        <>
          <OptionsSecond opcionElegida1={selectedOption} />
        </>
      )}
    </>
  );
};

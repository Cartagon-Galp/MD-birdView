import { AiOutlineCheck } from "react-icons/ai";
import "../styleSheets/options.css";
import "../App.css";
import { useEffect, useState } from "react";
import { OptionsFour } from "./OptionsFour";

export const OptionsThird = ({ opcionElegida2, primeraSubopcion }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selected3Option, setSelected3Option] = useState(null);

  useEffect(() => {
    // Restablecer el estado cuando cambia la opción seleccionada
    setActiveButtonIndex(null);
    setSelected3Option(null);
  }, [opcionElegida2]);

  const handleButtonClick = (opcion, index) => {
    setSelected3Option(opcion.nombre);
    setActiveButtonIndex(index);
  };

  let opcion3 = primeraSubopcion.filter(
    (subopcion) => subopcion.nombre === opcionElegida2
  );

  let segundaSubOpcion = opcion3[0] ? opcion3[0].subopciones : [];

  return (
    <>
      <div className="button-container">
        {segundaSubOpcion.map((opcion) => (
          <button
            title="Expand this"
            key={opcion.id}
            className="button blue"
            style={{
              backgroundColor:
                activeButtonIndex === opcion.id
                  ? "rgba(112, 226, 255, 0.7)"
                  : "white",
              color: activeButtonIndex === opcion.id && "white",
            }}
            onClick={() => handleButtonClick(opcion, opcion.id)}
          >
            <div className="left">
              <AiOutlineCheck />
            </div>
            <div className="right">{opcion.nombre}</div>
          </button>
        ))}
      </div>
      {selected3Option && (
        <>
          <OptionsFour
            opcionElegida3={selected3Option}
            segundaSubOpcion={segundaSubOpcion}
          />
        </>
      )}
    </>
  );
};

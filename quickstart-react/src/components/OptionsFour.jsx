import { IoIosCalculator } from "react-icons/io";
import "../styleSheets/options.css";
import "../App.css";
import { useEffect, useState } from "react";

export const OptionsFour = ({ opcionElegida3, segundaSubOpcion }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selected4Option, setSelected4Option] = useState(null);

  useEffect(() => {
    // Restablecer el estado cuando cambia la opción seleccionada
    setActiveButtonIndex(null);
    setSelected4Option(null);
  }, [opcionElegida3]);

  const handleButtonClick = (opcion, index) => {
    setSelected4Option(opcion.nombre);
    setActiveButtonIndex(index);
  };
  let opcion4 = segundaSubOpcion.filter(
    (subopcion) => subopcion.nombre === opcionElegida3
  );
  let terceraSubOpcion = opcion4[0] ? opcion4[0].subopciones : [];
  return (
    <>
      <div className="button-container">
        {terceraSubOpcion.map((opcion) => (
          <button
            title="Expand this"
            key={opcion.id}
            className="button red"
            style={{
              backgroundColor:
                activeButtonIndex === opcion.id
                  ? "rgba(247, 59, 59, 0.7)"
                  : "white",
              color: activeButtonIndex === opcion.id && "white",
            }}
            onClick={() => handleButtonClick(opcion, opcion.id)}
          >
            <div className="left">
              <IoIosCalculator />
            </div>
            <div className="right">{opcion.nombre}</div>
          </button>
        ))}
      </div>
    </>
  );
};

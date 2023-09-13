import { useEffect, useState } from "react";
import { VscChecklist } from "react-icons/vsc";
import opcionesData from "../helper/opciones.json";
import { OptionsThird } from "./OptionsThird";

const OptionsSecond = ({ opcionElegida1 }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selected2Option, setSelected2Option] = useState(null);

  useEffect(() => {
    // Restablecer el estado cuando cambia la opción seleccionada
    setActiveButtonIndex(null);
    setSelected2Option(null);
  }, [opcionElegida1]);

  const handleButtonClick = (opcion, index) => {
    setSelected2Option(opcion.nombre);
    setActiveButtonIndex(index);
  };

  let opcion2 = opcionesData.opciones.filter(
    (opcion) => opcion.nombre === opcionElegida1
  );

  let primeraSubopcion = opcion2[0].subopciones;

  return (
    <>
      <div className="button-container">
        {primeraSubopcion.map((opcion) => (
          <button
            title="Expand this"
            key={opcion.id}
            className="button green"
            style={{
              backgroundColor:
                activeButtonIndex === opcion.id
                  ? "rgba(10, 199, 10, 0.5)"
                  : "white",
              color: activeButtonIndex === opcion.id && "white",
            }}
            onClick={() => handleButtonClick(opcion, opcion.id)}
          >
            <div className="left">
              <VscChecklist />
            </div>
            <div className="right">{opcion.nombre}</div>
          </button>
        ))}
      </div>
      {selected2Option && (
        <>
          <OptionsThird
            opcionElegida2={selected2Option}
            primeraSubopcion={primeraSubopcion}
          />
        </>
      )}
    </>
  );
};

export default OptionsSecond;

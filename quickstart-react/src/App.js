import React, { useState } from "react";
import "./App.css";
import "./stylesheet/options.css";
import { Elections } from "./componentsNew/Elections";
import { Items2 } from "./componentsNew/Items2";
import { Bu2 } from "./componentsNew/Bu2";
import { Initiative } from "./componentsNew/Initiative";

const App = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [election, setElection] = useState(null);
  const [arrayBu, setArrayBu] = useState([]);
  const [tree, setTree] = useState(null);
  const [arrayBuElection, setArrayBuElection] = useState(null);
  const [secondStep, setSecondStep] = useState(null);
  const [secondStepInitiative, setSecondStepInitiative] = useState(null);
  const [thirdStep, setThirdStep] = useState(null);

  return (
    <>
      <section className="container">
        <Elections
          activeButtonIndex={activeButtonIndex}
          setActiveButtonIndex={setActiveButtonIndex}
          setTree={setTree}
          setSecondStep={setSecondStep}
          election={election}
          setElection={setElection}
          setSecondStepInitiative={setSecondStepInitiative}
          setThirdStep={setThirdStep}
        />
        <Items2
          activeButtonIndex={activeButtonIndex}
          setActiveButtonIndex={setActiveButtonIndex}
          setElection={setElection}
          tree={tree}
          setTree={setTree}
          setSecondStep={setSecondStep}
          setSecondStepInitiative={setSecondStepInitiative}
          setThirdStep={setThirdStep}
        />
        <Bu2
          activeButtonIndex={activeButtonIndex}
          setActiveButtonIndex={setActiveButtonIndex}
          setElection={setElection}
          setArrayBu={setArrayBu}
          tree={tree}
          setTree={setTree}
          setArrayBuElection={setArrayBuElection}
          secondStep={secondStep}
          setSecondStep={setSecondStep}
          setThirdStep={setThirdStep}
        />
        <Initiative
          activeButtonIndex={activeButtonIndex}
          setActiveButtonIndex={setActiveButtonIndex}
          setElection={setElection}
          setTree={setTree}
          arrayBu={arrayBu}
          arrayBuElection={arrayBuElection}
          secondStep={secondStep}
          setSecondStep={setSecondStep}
          secondStepInitiative={secondStepInitiative}
          setSecondStepInitiative={setSecondStepInitiative}
          thirdStep={thirdStep}
          setThirdStep={setThirdStep}
        />
      </section>
    </>
  );
};

export default App;

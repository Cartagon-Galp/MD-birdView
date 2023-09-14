import React, { useState } from "react";
import "./App.css";
import Objective from "./components/Objective";

const App = () => {
  const [isBuVisible, setIsBuVisible] = useState(false);
  const [isInVisible, setIsInVisible] = useState(false);

  return (
    <>
      <section className="container">
        <Objective
          isBuVisible={isBuVisible}
          setIsBuVisible={setIsBuVisible}
          isInVisible={isInVisible}
          setIsInVisible={setIsInVisible}
        />
      </section>
    </>
  );
};

export default App;

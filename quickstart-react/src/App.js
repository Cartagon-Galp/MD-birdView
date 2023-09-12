import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
import Objective from "./components/Objective";
import Box from '@mui/material/Box';
import ItemsObjetive from "./components/ItemsObjetive";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

/**
 * Represents the main application component.
 * 
 * The `App` component is a React component that renders the `Objective` component inside a `Box` component. 
 * It sets up event listeners and retrieves the user's context data from the Monday platform. 
 * The `attentionBoxText` variable includes the user's `user_id` from the context data.
 * 
 * @returns {JSX.Element} The rendered React component.
 */
const App = () => {
  const [context, setContext] = useState();

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data
  const attentionBoxText = `Hello, your user_id is: ${
    context ? context.user.id : "still loading"
  }.
  Let's start building your amazing app, which will change the world! HOLAAAAAA`;

  return (
    <>
    {/* <div className="App">
       <AttentionBox
        title="Hello Monday Apps!"
        text={attentionBoxText}
        type="success"
      />
      </div> */}
  <p></p>
      <Box sx={{
        background:'white',
        color:'blue',
        width: 500,
        alignContent: "center"
      }}>
        <Objective/>
        <p></p>
        <ItemsObjetive/>
      </Box>
      </>
  );
};

export default App;



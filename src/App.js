import React from "react";
import FormGroup from "components/FormGroup";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <FormGroup text="Email" name="email" inputType="text" />
    </div>
  );
};

export default App;

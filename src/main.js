import * as React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import AppMain from "./App";

function App() {
  return (
    <Routes>
      <Route path="/user">
        <Route path=":usernameId" element={<AppMain />} />
      </Route>
    </Routes>
  );
}
export default App;

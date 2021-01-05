import React from "react";
import ReactDOM from "react-dom";
import MDAppLibrary from "./AppLib/index";

window.MDLibrary = (obj) => {
  const { MDAppLibraryId = "" } = obj;
  ReactDOM.render(
    <MDAppLibrary {...obj} />,
    document.getElementById(MDAppLibraryId)
  );
};

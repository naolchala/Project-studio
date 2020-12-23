import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Button } from "./Components/Button/Button";
import Login from "./Pages/Login";

const App: FunctionComponent = () => {
    return (
        <div className="app">
            <Login></Login>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

// Richie T-57866

// Import the necessary modules from react.
import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

/* Sets up React framework to be rendered in the element with the id 'root'. */
const AppRouter = () => (
    <Router>
        <App />
    </Router>
)

ReactDOM.render(<AppRouter/>, document.querySelector('#root'))
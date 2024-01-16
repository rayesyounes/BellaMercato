import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App.jsx";
import "./assets/styles/App.css";
import { ChakraProvider } from "@chakra-ui/react";

import { store } from "./app/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
);

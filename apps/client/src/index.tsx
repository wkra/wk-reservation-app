import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./app/app";
// import {client} from './ApolloClient/client';
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./store/index";
import "./index.css";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "http://localhost:3333/graphql",
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <ApolloProvider client={client}>
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
  // </ApolloProvider>
);

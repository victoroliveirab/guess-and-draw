import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import Routes from "./routes";

import store from "./store";
import theme from './themes';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;

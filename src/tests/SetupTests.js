import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store as reduxStore } from "../redux/store";

const ReduxProvider = ({ children }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: ReduxProvider, ...options });

export * from "@testing-library/react";

export { customRender as render };

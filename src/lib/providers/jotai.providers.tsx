import { createStore, Provider } from "jotai";

const jotaiStore = createStore();

export const JotaiStoreProvider: Component = ({ children }) => {
  return <Provider store={jotaiStore}>{children}</Provider>;
};

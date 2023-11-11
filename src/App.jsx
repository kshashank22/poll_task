import React from "react";
import PollPage from "./page/PollPage";
import { Provider } from "react-redux";
import store from "./redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <PollPage />
      </div>
    </Provider>
  );
};

export default App;


import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { STORE } from "./reducer/STORE";
import routes from "./routes/routes";


function App() {
console.log(STORE.getState())
  return (
    <Provider store={STORE}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;

import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/reducer";

const middelwares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function saveToLocalStorage(state) {
  try {
    const stringifiedData = JSON.stringify(state);
    localStorage.setItem("stringData", stringifiedData);
  } catch (error) {
    console.log(error.message);
  }
}
const getDataFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("stringData");
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    console.log(error.massage);
    return undefined;
  }
};

const store = createStore(
  reducer,
  getDataFromLocalStorage(),
  composeEnhancers(applyMiddleware(...middelwares))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;

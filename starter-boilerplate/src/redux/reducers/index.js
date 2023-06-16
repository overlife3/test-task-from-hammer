import { combineReducers } from "redux";
import Auth from "./Auth";
import clients from "./Clients";
import Theme from "./Theme";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  clients: clients,
});

export default reducers;

import { combineReducers } from "redux";
import Auth from "./Auth";
import Clients from "./Clients";
import Planner from "./Planner";
import Theme from "./Theme";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  clients: Clients,
  planner: Planner,
});

export default reducers;

// Set up your root reducer here...
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import contacts from "../reducers/contactsReducer";
import apiCallsInProgress from "../reducers/apiStatusReducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    contacts,
    apiCallsInProgress
  });

export default rootReducer;

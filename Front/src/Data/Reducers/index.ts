import { combineReducers } from "redux";
import UserReducer from "./User";

const allReducers = combineReducers({
    user: UserReducer,
});

export default allReducers;

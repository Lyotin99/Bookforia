import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer/userReducer";
import dataReducer from "./reducers/dataReducer/dataReducer";
import uiReducer from "./reducers/uiReducer/uiReducer";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const middleware = [thunk];

const reducers = combineReducers({
	user: userReducer,
	data: dataReducer,
	UI: uiReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(
	reducers,
	{},
	compose(applyMiddleware(...middleware), enhancer)
);

export type State = ReturnType<typeof reducers>;

export default store;

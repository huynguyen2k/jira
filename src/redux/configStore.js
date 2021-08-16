import { createStore, applyMiddleware, combineReducers } from "redux"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas/rootSaga"
import userReducer from "./reducers/userReducer"
import projectReducer from "./reducers/projectReducer"

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
	userReducer,
	projectReducer,
})

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store

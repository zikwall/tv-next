import reducer from './reducers';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../app/redux/reducers'

const loggerMiddleware = createLogger();
export const appStore = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export const initializeStore = () => {
    return appStore;
};

export const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState, applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));
};

import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import App from './main/App';
import * as serviceWorker from './serviceWorker';
import cepReducer from './store/cep/cep.store';
import cepSaga from './store/cep/cep.saga'


const reducer = combineReducers({
  cepStore: cepReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(cepSaga);

const application = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(application, document.getElementById('root'));

serviceWorker.unregister();

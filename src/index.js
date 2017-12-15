import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './redux/reducers/reducerIndex';
import App from './App';

export default function Index() {

    const store = createStore( reducers, {}, applyMiddleware(ReduxThunk) )

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
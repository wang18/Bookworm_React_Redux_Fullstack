import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userLoggedIn} from "./actions/auth";
import decode from 'jwt-decode';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store =createStore(
    rootReducer,
    //applyMiddleware(thunk)
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.bookwormJWT){
    const payload = decode(localStorage.bookwormJWT);
    const user = {
        token: localStorage.bookwormJWT,
        email: payload.email,
        confirmed: payload.confirmed
    };
    setAuthorizationHeader(localStorage.bookwormJWT);
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

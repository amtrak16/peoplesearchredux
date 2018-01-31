import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';

const Root = () => (
    <Provider store={store}>
        <App title={'People Search - Redux'}/>
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

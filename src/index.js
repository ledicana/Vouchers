import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import VoucherView from './views/VoucherView';
import Intro from '../src/components/Intro';
/**
 * This Promise gets resolved, when the chayns API was successfully loaded and
 * every additional functionality of it is ready to go.
 */

chayns.ready.then(function() {
    "use strict";

    /**
     * Triggers the loading of the tasks even before the Components are even rendered
     */

    ReactDOM.render(
        <div>
            <Intro />
            <VoucherView />
        </div>,
        document.querySelector('.tapp')
    );

}).catch(function() {
    console.log('no chayns environment found');
});
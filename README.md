# Calculator

React based clone of OSX calculator.

Essentially an over-engineered version calculator with 52bit operation limit.

# Prepare

`npm install`


# Run

`npm start`

Loads `webpack-dev-server` with compiled bundle and hot module reloader.

# Test

`npm test`

Runs tests for redux store and basic calculator functions.

# Simpler implementation:

This could've been implemented with plain html controls and event delegation.
Events could dispatch actions on redux store and force Head/Result component to re-render.

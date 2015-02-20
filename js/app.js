/*
 * Copyright (c) 2015, Albert Chan
 * All rights reserved.
 *
 */

var React = require('react');

var MyComponent = React.createClass({
    render: function() {
        return <span className="MyComponent">Hello, MyComponent!</span>;
    }
});

module.exports = MyComponent;
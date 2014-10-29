function obj_removedProperty() {
    var obj = { foo: 'Foo' };

    delete obj.foo;

    obj.foo = 'Bar';
    return obj;
}

function obj_consistent() {
    var obj = { foo: 'Foo' };

    return obj;
}

var runner = require('./runner');

runner.testObj(obj_removedProperty);
runner.testObj(obj_consistent);
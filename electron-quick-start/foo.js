/// <reference path="./node.d.ts" />
System.register(['child_process', 'node_modules/maskjs/x.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var child, baz;
    var foo;
    return {
        setters:[
            function (child_1) {
                child = child_1;
            },
            function (baz_1) {
                baz = baz_1;
            }],
        execute: function() {
            console.log('> baz', baz);
            foo = child.exec('foo.sh');
            console.log(typeof foo.on);
        }
    }
});
//# sourceMappingURL=foo.js.map
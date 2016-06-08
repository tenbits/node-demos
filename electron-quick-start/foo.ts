import * as child from 'child_process';
import * as baz from 'node_modules/maskjs/x.js';


console.log('> baz', baz);

var foo: child.ChildProcess = child.exec('foo.sh');
console.log(typeof foo.on);
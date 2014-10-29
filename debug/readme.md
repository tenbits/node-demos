Debug Application
----

- 
	`$ node debug test.js`
	
	Commands:
		- `n (next)`
		- `c (cont)` : continue
		- `s (step)` : step into
		- `o (out)`  : step out

		- `backtrace`  : print stacktrace
		- `list(5)`    : print 5 lines before and after
		- `watch(expr)`: watch expression
		- `repl`       : open repl for evaluation in current scope/context


- 
	`$ npm install -g node-inspector`
	`$ node-debug test.js`
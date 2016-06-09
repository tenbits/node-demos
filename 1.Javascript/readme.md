### Javascript

#### Types

- **Value Types:** Number, String, Boolean
	
	```js
	1, 'Hello world', true
	```

	- **ES2016** Template strings	
		
		- Multiline (_preserv complete indentation_):
			
			```js
				`
				Lorem
				Ipsum
				`
			```
		- Interpolations (_expression_):

			```js
				var age = 42;
				`Age is ${ age + 1 }`
			```
		- Tag functions

			```js
			function test(strings, ...values) {
				// strings array is freezed
				strings = Array.from(strings);
				return values.reduce(
					(aggr, str, i) => aggr + values[i] + strings[i], 
					strings.shift()
				);
			}
			var age = 42;
			test`Age is ${age + 1}`;
			```
- **Reference Types**: Object, Array, Functions, RegExp, etc
	
	```js
	// Literals
	var obj = { foo: 'bar' };
	var arr = [1, 2, obj, 'x'];
	var rgx = /a/g;
	var fnA = function(a, b){ return a + b; }

	function fnB(a, b){ a + b };
	```

# Functions
	
	- Context: this, `apply`, `call`, `bind`

	- Arrow functions

		- Bind lexically this value
		- Expression: 

			```js
			(a, b) => a + b
			```

		- Statement: 

			```js
			(a, b) => {
				return a + b
			}
			```

### Scope

	- Global scope + every function creates its own scope
	- Declarations are **Hoisted** within a scope (**vars, functions**)

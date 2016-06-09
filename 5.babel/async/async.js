
function getValue () {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(42), 100);
	});
}

async function Foo () {
	var value = await getValue();
	return value; 
}


module.exports = Foo;
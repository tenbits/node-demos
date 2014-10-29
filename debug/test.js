function increment(arr) {
	for(var i = 0; i < arr.length; i++) {
		++arr[0];
	}
}

function fill(arr) {
	debugger;
	
	var count = 100;
	for (var i = 0; i < count; i++) {
		arr[i] = i;
	}
}


var arr = [];

fill(arr);
increment(arr);

console.log('Done. First Item: ', arr[0]);
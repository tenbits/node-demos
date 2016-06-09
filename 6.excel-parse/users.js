var Excel = require('xlsx');
var book = Excel.readFile('users.xlsx');
var sheet = book.Sheets['Blatt1'];


io.File.write('users.json', getAll(sheet));



function getAll(sheet) {
	return readCols(sheet, 2, 4);
}

function readCols(sheet, start, end) {
	var MapColumn = {
		A: 'userName',
		B: 'email'
	};

	var arr = [];
	for(var i = start; i < end; i++) {
		var user = Object.create(null);
		for(let letter in MapColumn) {
			let property = MapColumn[letter];
			user[property] = readCell(sheet, letter, i);
		}
		arr.push(user)
	}
	return arr;
}
function readCell (sheet, letter, number) {
	var cell = sheet[letter + number];
	return cell.v;
}
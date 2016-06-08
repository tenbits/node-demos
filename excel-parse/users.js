var Excel = require('xlsx');
var book = Excel.readFile('users.xlsx');
var sheet = book.Sheets['Blatt1'];

GenAll(Sheet);

io.File.write('users.json', getAll(sheet));



function getAll(sheet) {
	readCols(sheet, 2, 4);
}

function readCols(sheet, start, end) {
	var Model = {
		userName: 'A',
		email: 'B'
	};


	var i = start,
		imax = end;

	var arr = [];
	for(; i < imax; i++) {
		var user = Object.create(Model);
		for (var key in Model) {
			user[key] = readCell(sheet, Model[key], i);
		}
		arr.push(user)
	}
	return arr;
}
function readCell (sheet, letter, number) {
	var cell = sheet[letter + number];
	return cell.v;
}
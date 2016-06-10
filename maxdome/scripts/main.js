$('#load').click(function(){
	$
		.getJSON('/api/v1/users')
		.then((users) => {
			var $ul = $('<ul>');
			users.forEach(user => {
				$('<li>')
				.text(user.name)
				.appendTo($ul);
			});
			$ul.appendTo('body');
		}, (error) => {
			alert(error);
		})
})

$('#create').click(function(){
	var user = {
		name: $('input[name=name]').val(),
		password: $('input[name=password]').val(),
	};

	// $.post('/api/v1/users', user).then(function(user){
	// 	alert('Ok: ' + user._id)
	// }, function(error){
	// 	alert('Error ' + error);
	// });

	socket.emit('user:post', user, function(user){
		alert(user._id);
	});

	return false;
})

var socket = io.connect()
	.on('user:new', (user) => {
		$('<li>')
			.text(user.name)
			.appendTo($('ul'));
	})
	.on('date', datum => console.log(datum));
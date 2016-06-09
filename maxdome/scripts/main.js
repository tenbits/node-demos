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


mask.registerHandler(':model', Compo({

	onRenderStart: function(model, ctx, container){
		var user = ctx.req.user;
		
		if (user == null) {
			return ctx.redirect('/login');
		}
		
		var resume = Compo.pause(this, ctx),
			query = ctx.page.query;
		
		var from, to;
		
		from = new Date(query.from);
		to = new Date(query.to);
			
		
		if (isNaN(from.getDate())) {
			var range = ruqq.date.getMonthRange(new Date);
			from = range.from;
			to = range.to;
		}
		
		
		var await = new Class.Await();
		
		this.model = {
			
			config: {
				themes: app.config.themes,
			},
			
			user: user,
			calendars: user.getCalendars(),
			settings: Model
				.Settings
				.fetch()
				.done(await.delegate()),
			
			dienste: Model
				.Dienste
				.search(ctx.req.user, {
					calendars: 'all',
					from: from,
					to: to
				})
				.done(await.delegate()),
				
			termine: Model
				.Termine
				.search(ctx.req.user, {
					calendars: 'all',
					from: from,
					to: to
				})
				.done(await.delegate()),
				
			from: from
		};
		
		await.always(resume);
	},
	onRenderStartClient: function(model, ctx, container){
		
		
		window.Current = this.model;
		
		
		this.model.calendars = this.model.user.getCalendars();
		this.model.filter = {
			dienst: []
		};
		
		var date = new Date(this.model.from),
			dienste = this.model.dienste,
			termine = this.model.termine
			;
		
		dienste.resolve(dienste);
		termine.resolve(termine);
		
		Model
			.Appointments
			.registerMonth('dienste', date, dienste);
		
		Model
			.Appointments
			.registerMonth('termine', date, termine);
	}
}));


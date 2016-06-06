include 
	.js('filereader.js')
	.load('filereader-input.mask::Template') 
	.css('filereader-input.less') //
	.done(function(resp){

		mask.registerHandler(':filereader-input', Compo.createClass({
			template: resp.load.Template,

			compos: {
				'input': '$: .-fr-input',
				'dropzone': '$: .-fr-dropzone'
			},
			//events: {
			//
			//},
			//slots: {
			//
			//},
			//pipes: {
			//
			//},
			//constructor: function(){
			//
			//},

			
			onRenderStart: function(model, ctx, container){
				this.model = {};
			},
			onRenderEnd: function(elements, model, ctx, container){
				
				var options = {
					readAsDefault: 'Text',
					accept: 'text/*',
					on: {
						loadend: this.onFileRead,
						error: this.onError,
						skip: this.onSkip,
					}
				}
				
				this.compos.input.fileReaderJS(options);
				this.compos.dropzone.fileReaderJS(options);
			},
			
			Self: {
				onFileRead: function(event, file){
					var source = event.target.result;
					if (typeof source !== 'string') {
						this.model.message = 'Undefined file content'
						return;
					}
					
					this.emitOut('fileReader_onRead', source);
				},
				onSkip: function(file){
					this.model.message = 'Only *.ics is supported';
				},
				onError: function(event, file){
					this.model.message = 'Error while reading the file';
					debugger;
				}
			}
	
		}));


	});

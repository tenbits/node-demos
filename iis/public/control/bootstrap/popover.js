include
    .css('popover.less')
    .done(function() {
        
        // @reference viewer.mask for usage example
        
        mask.registerHandler(':popover', Compo.createClass({
            
			template: '.-popover-wrapper; .-popover > .-popover-container;',
			compos: {
				$wrapper: '$: .-popover-wrapper',
				$container: '$: .-popover-container',
				$popover: '$: .-popover'
			},
            slots: {
				popoverClose: function(){
					this.hide();
				}
			},
			events: {
				'mouseup: .-popover-wrapper': function(){
					this.hide();
				}
			},
			show: function(event, template, model){
				
				this
					.compos
					.$container
					.emptyAndDispose()
					.appendMask(template, model)
					;
				
				var offset = this.compos.$popover.parent().offset(),
					x  = event.pageX,
					y  = event.pageY
					;
				
				x -= offset.left;
				y -= offset.top;
				
				this.$.show();
				
				var $popover = this.compos.$popover,
					width = $popover.innerWidth(),
					height = $popover.innerHeight()
					;
					
				x -= width / 2;
				y -= height + 20;
				
				var transitionFrom = -30,
					direction = 'top';
				if (y < 5) {
					y = event.pageY - offset.top + 20;
					transitionFrom = 30;
					direction = 'bottom';
				}
				
				$popover
					.removeClass('-popover-top -popover-bottom')
					.addClass('-popover-' + direction)
					;
				
				
				var style = $popover[0].style;
				style.left = x + 'px';
				style.top = y + 'px';
				
				mask.animate($popover[0], {
					model: [
						'transform | translateY(' + transitionFrom + 'px) > translateY(0px) | 200ms ease',
						'opacity| 0 > 1 | 200ms ease'
					]
				});
				
				//defer_fn(attach_hideListeners, this.hideWorker);
			},
			Self: {
				hide: function(){
					
					//defer_fn(deatch_hideListeners, this.hideWorker);	
					
					this.compos.$wrapper.hide();
					mask.animate(this.compos.$popover[0], {
						model: [
							'transform | scale(1) > scale(1.5) | 200ms ease',
							'opacity| 1 > 0 | 200ms ease'
						],
						next: [
							'display| > none'
						]
					});
				},
				hideWorker: function(event){
					
					if ($(event.target).closest('.-popover').length)
						return;
					
					event.stopPropagation();
					event.preventDefault();
					
					this.hide()
				}
			}
        }));

		function event_dismiss(event) {
			
			event.stopPropagation();
			event.preventDefault();
		}
		
		function defer_fn(fn, hideWorker) {
			setTimeout(function(){
				fn(hideWorker);
			});
		}
		
		function attach_hideListeners(hideWorker){
			on('mouseup', hideWorker);
			
			on('click', event_dismiss);
			on('touchstart', event_dismiss);
			on('mousedown', event_dismiss);
		}
		
		function deatch_hideListeners(hideWorker){
			off('mouseup', hideWorker);
			
			off('click', event_dismiss);
			off('touchstart', event_dismiss);
			off('mousedown', event_dismiss);
		}
		
		function on(type, fn){
			document.addEventListener(type, fn, true);
		}
		function off(type, fn){
			document.removeEventListener(type, fn, true);
		}
    });
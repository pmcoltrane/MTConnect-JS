(function($){

	var methods = {
	
		init: function(devicesDataItem){
			return this.each(function(){
				var $this = $(this);
				var $item = $(devicesDataItem);
				
				$('<h1></h1>')
					.attr('data-role', 'DataItem.Name')
					.text($item.attr('name')||$item.attr('id'))
					.appendTo($this)
				;
				if($item.attr('subType')){
					$('<span></span>')
						.attr('data-role', 'DataItem.Subtype')
						.text($item.attr('subType') + ' ')
						.appendTo($this)
					;
				}
				$('<span></span>')
					.attr('data-role', 'DataItem.Type')
					.text($item.attr('type').replace(/_/gi, ' '))
					.appendTo($this)
				;
				$('<br/>').appendTo($this);
				$('<span></span>')
					.attr('data-role', 'DataItem.Value')
					.text('')
					.appendTo($this)
				;
			
				$this.addClass('DataItem');
				$this.attr('data-itemid', $item.attr('id'));
				$this.attr('data-role', 'DataItem');
				$this.data('DataItem', {
					probe: $item
				});
			});
		},
		
		update: function(streamsDataItem){
			return this.each(function(){
				var $this = $(this);
				var $item = $(streamsDataItem);
				var data = $this.data('DataItem');
				
				var $elem = $this.find('[data-role="DataItem.Value"]');
				switch(data.probe.attr('category')){
					case 'CONDITION':
						$elem
							.text($item.text()||$item.prop('tagName'))
							.removeClass('UNAVAILABLE,NORMAL,WARNING,FAULT')
							.addClass($item.prop('tagName'))
						;
						break;
					case 'EVENT':
					case 'SAMPLE':
					default:
						$elem
							.text($item.text())
							.removeClass()
							.addClass($item.text())
						;
						break;
				}
			});
		}
	
	};

	$.fn.DataItem = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === 'object' || !method){
			return methods.init.apply(this, arguments);
		}
		else{
			$.error('Method ' + method + ' does not exist on jQuery.DataItem');
		}
	}

})(jQuery);

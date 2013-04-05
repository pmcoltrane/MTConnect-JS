(function($){

	var methods = {
		
		init: function(element){
			var $element = $(element);
			return $(this).each(function(){
				var $this = $(this);
				var id = $element.attr('id');
				var nameOrId = $element.attr('name') || id;
				
				$this
					.attr('data-role', 'Device')
					.attr('data-device-id', id)
					.append($('<h1></h1>').text(nameOrId))
					.append($('<div data-role="program"></div>'))
					.append($('<div data-role="block"></div>'))
					.append($('<ul></ul>'))
				;
				
				data[id] = {element: $element, items:{}}
				$element.find('DataItem').each(function(){
					var $this = $(this);
					if(
						$this.attr('type') === 'EXECUTION' 
						|| $this.attr('type') === 'AVAILABILITY'
						|| $this.attr('type') === 'PROGRAM'
						|| $this.attr('type') === 'BLOCK'
					){
						data[id].items[$this.attr('id')] = $this;
					}
				});
				
			});
		},
		
		update: function(stream){
			var $device = $(this);
			var deviceId = $device.attr('data-device-id');
			
			var $stream= $(stream);
			
			//var lag = (new Date() - new Date($stream.find('Header').attr('creationTime')));	//TODO: remove debug code. this will not work on some browsers.
			//if(lag>9200) console.log('Lag: ' + lag + ' ms');
			
			return $stream.find('Samples,Events,Condition').children().each(function(){
				var item = this;
				var $item = $(this);
				var itemId = $item.attr('dataItemId');
				if(data[deviceId].items.hasOwnProperty(itemId)){
					if($item.is('Execution')){
						$device.removeClass('active ready stopped interrupted unavailable').addClass($item.text().toLowerCase());
						console.log('Execution: ' + $item.text());
					}
					else if($item.is('Availability') && $item.text() === 'UNAVAILABLE'){
						$device.removeClass('active ready stopped interrupted unavailable').addClass('unavailable');
						console.log('Availability: ' + $item.text());
					}
					else if($item.is('Program')){
						$device.find('[data-role="program"]').text($item.text());
						console.log('Program: ' + $item.text());
					}
					else if($item.is('Block')){
						$device.find('[data-role="block"]').text($item.text());
					}
					
				}
			});
		}
		
	};
	
	var data = {};
	
	var notifications = {};
	
	var pushNotification = function(device, item){
		if( !notifications.hasOwnProperty(device) ) notifications[device] = {};
		notifications[device][item.attr('dataItemId')] = item;
	};

	$.fn.Device = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === 'object' || !method){
			return methods.init.apply(this, arguments);
		}
		else{
			$.error('Method ' + method + ' does not exist on jQuery.Device');
		}
	}

})(jQuery);
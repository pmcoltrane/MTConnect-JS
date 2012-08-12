/*	MTConnectMonitor.js
 *	A very basic MTConnect client.
 *	This is a quick-and-dirty module that may be expanded in the future.
 *
 *	Dependencies:
 *	jQuery	http://jquery.com/
 *	MTConnect.js in this package
 *
 *	Copyright © 2012 Phil Coltrane
 *	Released under the MIT license
 */

(function($){
	
	var methods = {
	
		/*	Initializes a monitor plugin
		 *	data: XML string data representing a successful /probe request
		 */
		init:	function(data){
			var xmlDoc = $(data);
			var devices = xmlDoc.find("Device");
		
			return this.each(function(index, element){
				$(element).empty();
				$.each(devices, function(index, value){
					var name = $(value).attr('name');
					var id = $(value).attr('id');
					var uuid = $(value).attr('uuid');
					
					var sectionElem = $('<section>')
						.attr('data-mtconnect-role', 'device')
						.attr('data-mtconnect-uuid', uuid)
						.attr('data-mtconnect-id', id)
						.attr('data-mtconnect-name', name)
						.appendTo($(element));
						
					var deviceTitle = $('<span>')
						.text(name)
						.appendTo($(sectionElem));
					
					var deviceListElem = $('<ul>')
						.appendTo($(sectionElem));
						
					//Walk DataItems
					$(deviceListElem).MTConnectMonitor('dataitems', value);
					
					//Walk Components (recursive)
					$(deviceListElem).MTConnectMonitor('components', value);					
				});
				
			});
		},
		
		/*	Appends to the given element a list of subcomponents for the given component.
		 *	data: XML node representing an MTConnect probe Device or Component.
		 */
		components: function(data){
			return this.each(function(index, element){
				$.each($(data).children('Components').children(), function(index, value){
					var name = $(value).attr('name');
					var id = $(value).attr('id');

					var displayName = (name==null ? id : name);
					
					var c = $('<li>')
						.attr('data-mtconnect-role', 'component')
						.attr('data-mtconnect-id', id)
						.attr('data-mtconnect-name', name)
						.text(displayName).appendTo($(element));
					
					var cListElem = $('<ul>').appendTo($(c));
					
					//Walk DataItems
					$(cListElem).MTConnectMonitor('dataitems', value);
					
					//Walk Components
					$(cListElem).MTConnectMonitor('components', value);
				});			
			});
		},
		
		/*	Appends to the given element a list of dataitems for the given component.
		 *	data: XML node representing an MTConnect probe Device or Component.
		 */
		dataitems:	function(data){
			return this.each(function(index, element){
				$.each($(data).children('DataItems').children(), function(index, value){
					var name = $(value).attr('name');
					var id = $(value).attr('id');
					var category = $(value).attr('category');
					var type = $(value).attr('type');
					var units = $(value).attr('units');
					var di = $('<li>')
						.attr('data-mtconnect-role', 'dataitem')
						.attr('data-mtconnect-id', id)
						.attr('data-mtconnect-category', category)
						.attr('data-mtconnect-type', type)
						.attr('data-mtconnect-units', units)
						.appendTo($(element));
						
					var displayName = (name==null ? id : name);
					$('<span>')
						.attr('data-mtconnect-id', id)
						.attr('data-mtconnect-ui-name', displayName)
						.text(displayName)
						.appendTo($(di));
						
					$('<span>')
						.attr('data-mtconnect-id', id)
						.attr('data-mtconnect-ui-value', 'UNAVAILABLE')
						.text('UNAVAILABLE')
						.appendTo($(di));
						
					if(units!==null){
						$('<span>')
							.attr('data-mtconnect-id', id)
							.attr('data-mtconnect-ui-units', units)
							.text(units)
							.appendTo($(di));
					}
				});
			});
		},
		
		/*	Refreshes the given elements with the given data.
		 *	data: XML representing an MTConnect streams request, preferably a /current request.
		 */
		refresh:	function(data){
			return this.each(function(index, element){
				$.each($(element).find('[data-mtconnect-id]'), function(index, value){
					if( $(value).attr('data-mtconnect-ui-value') ){
						var di = $(data).find('[dataItemId="' + $(value).attr('data-mtconnect-id') + '"]');
						var itemValue = $(di).text();
						
						if($(value).parent().attr('data-mtconnect-category')=="CONDITION"){
							var condition = di[0].nodeName.toUpperCase();
							$(value).parent().attr('data-mtconnect-condition', condition);
							
							$(value).text( (itemValue.length==0) ? condition : itemValue );
						}
						else{
							$(value).text(itemValue);
						}
					}
				});
			});
		}
	};
	
	/*	Usage:
	 *		var probe = $.MTConnect('probe', {url:'http://agent.mtconnect.org'});
	 *		$('#monitor').MTConnectMonitor('init', probe);
	 *		var current = $.MTConnect('current', {url:'http://agent.mtconnect.org'});
	 *		$('#monitor').MTConnectMonitor('refresh', current);
	 */
	$.fn.MTConnectMonitor = function(method){
	
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} 
		else if(typeof method === 'object' || ! method){
			return methods.init.apply( this, arguments );
		}
		else{
			$.error('Method ' +  method + ' does not exist on jQuery.MTConnectMonitor');
		}
	};

})(jQuery);